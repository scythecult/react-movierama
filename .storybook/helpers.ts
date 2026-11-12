import type { Decorator } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider, type QueryKey } from '@tanstack/react-query';
import { type ComponentType, createElement, type ReactElement } from 'react';
import { MemoryRouter } from 'react-router';
import { enableMocks } from '../mocks';
import { MOCK_FILMS } from '../mocks/data/films';
import { MOCK_LOCATIONS } from '../mocks/data/locations';
import { MOCK_NEWS } from '../mocks/data/news';
import { createAppStore } from '../src/client/app/store/AppStore';
import { filmsQueries } from '../src/client/entities/films/api';
import { locationsQueries } from '../src/client/entities/locations/api';
import { newsQueries } from '../src/client/entities/news/api';
import { AppStoreProvider } from '../src/client/shared/lib/store';

const MODALS_ROOT_ID = 'modals';
const CANVAS_STYLE_ID = 'storybook-app-canvas';

const HIDDEN_CONTROL = {
  table: {
    disable: true,
  },
};

type SeedableQuery = {
  queryKey: QueryKey;
};

type StoryProviderOptions = {
  queryClient?: QueryClient;
  router?: boolean;
  store?: Partial<CombinedAppStore> | true;
};

const renderStory = (Story: Parameters<Decorator>[0]): ReactElement => createElement(Story as ComponentType);

export const hideControls = (...keys: string[]) =>
  Object.fromEntries(keys.map((key) => [key, HIDDEN_CONTROL]));

export const createStoryQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Number.POSITIVE_INFINITY,
      },
    },
  });

export const seedQuery = <TData>(queryClient: QueryClient, query: SeedableQuery, data: TData) => {
  queryClient.setQueryData(query.queryKey, data);
};

export const seedLocations = (queryClient: QueryClient, locations = MOCK_LOCATIONS) => {
  const [currentLocation] = locations;

  seedQuery(queryClient, locationsQueries.getCurrent(), currentLocation);
  seedQuery(queryClient, locationsQueries.list(), locations);
};

export const seedFilms = (queryClient: QueryClient, films = MOCK_FILMS) => {
  seedQuery(queryClient, filmsQueries.list(), films);
};

export const seedNews = (queryClient: QueryClient, news = MOCK_NEWS) => {
  seedQuery(queryClient, newsQueries.list(), news);
};

export const withProviders = (options: StoryProviderOptions = {}): Decorator => {
  const store = options.store ? createAppStore() : undefined;
  const initialState = options.store && options.store !== true ? options.store : undefined;

  return (Story) => {
    let story: ReactElement = renderStory(Story);

    if (options.router) {
      story = createElement(MemoryRouter, null, story);
    }

    if (store) {
      story = createElement(AppStoreProvider, { store, initialState }, story);
    }

    if (options.queryClient) {
      story = createElement(QueryClientProvider, { client: options.queryClient }, story);
    }

    return story;
  };
};

const prepareStorybookDocument = () => {
  if (typeof document === 'undefined') {
    return;
  }

  if (!document.getElementById(MODALS_ROOT_ID)) {
    const root = document.createElement('div');
    root.id = MODALS_ROOT_ID;
    document.body.appendChild(root);
  }

  if (document.getElementById(CANVAS_STYLE_ID)) {
    return;
  }

  const style = document.createElement('style');
  style.id = CANVAS_STYLE_ID;
  style.textContent = `
    .sb-show-main,
    .docs-story {
      background-color: var(--app-primary-bg) !important;
      color: var(--app-primary-text);
    }
  `;
  document.head.appendChild(style);
};

export const withStorybookDocument: Decorator = (Story) => {
  prepareStorybookDocument();

  return renderStory(Story);
};

let mocksStart: Promise<unknown> | undefined;

export const startStorybookMocks = async () => {
  try {
    mocksStart ??= enableMocks();
    await mocksStart;
  } catch (error) {
    mocksStart = undefined;
    console.error(error);
  }
};
