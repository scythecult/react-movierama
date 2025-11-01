import { QueryClient } from '@tanstack/react-query';
import { renderToString } from 'react-dom/server';
import { App } from './App';

const queryClient = new QueryClient();

export type RenderSsrTemplate = typeof renderSsrTemplate;
export const renderSsrTemplate = () => {
  const html = renderToString(<App queryClient={queryClient} />);

  return { html };
};
