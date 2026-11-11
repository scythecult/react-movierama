import { StatusCodes } from 'http-status-codes';
import { createStaticHandler } from 'react-router';
import { AppRoute } from '../../../common/constants/routes';
import { mainLoader } from '../../pages/main/model/main.loader';
import { orderLoader } from '../../pages/order/model/order.loaders';
import { appRoutes } from './appRoutes';
import { rootLoader } from './root.loader';

vi.mock('./root.loader', () => ({
  rootLoader: vi.fn(async () => ({ user: { id: '1' }, locations: [], location: { id: 23 } })),
}));

vi.mock('../../pages/main/model/main.loader', () => ({
  mainLoader: vi.fn(async () => ({ films: [{ id: 8 }], news: [] })),
}));

vi.mock('../../pages/order/model/order.loaders', () => ({
  orderLoader: vi.fn(async () => ({ location: { id: 23 }, hallplan: null })),
}));

const handler = createStaticHandler(appRoutes);

const queryPage = async (path: string) => {
  const context = await handler.query(new Request(`http://localhost${path}`));

  if (context instanceof Response) {
    throw new Error(`Expected a render context for ${path}`);
  }

  return context;
};

describe('appRoutes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should load the shell and the home page', async () => {
    const context = await queryPage(AppRoute.ROOT);

    expect(context.statusCode).toBe(StatusCodes.OK);
    expect(context.loaderData.root).toEqual({ user: { id: '1' }, locations: [], location: { id: 23 } });
    expect(context.loaderData.main).toEqual({ films: [{ id: 8 }], news: [] });
    expect(orderLoader).not.toHaveBeenCalled();
  });

  test('should load the order page for the order route and its checkout child', async () => {
    const order = await queryPage(AppRoute.ORDER);
    const checkout = await queryPage(`${AppRoute.ORDER}/checkout`);

    expect(order.statusCode).toBe(StatusCodes.OK);
    expect(order.loaderData.order).toEqual({ location: { id: 23 }, hallplan: null });
    expect(checkout.statusCode).toBe(StatusCodes.OK);
    expect(checkout.loaderData.order).toEqual({ location: { id: 23 }, hallplan: null });
    expect(mainLoader).not.toHaveBeenCalled();
  });

  test('should render a film page from the shell loader only', async () => {
    const context = await queryPage(`${AppRoute.FILMS}/12`);

    expect(context.statusCode).toBe(StatusCodes.OK);
    expect(rootLoader).toHaveBeenCalled();
    expect(mainLoader).not.toHaveBeenCalled();
    expect(orderLoader).not.toHaveBeenCalled();
  });

  test('should answer 404 for a path that has no page and still load the shell', async () => {
    const missing = await queryPage('/missing');
    const nested = await queryPage(`${AppRoute.ORDER}/missing`);

    expect(missing.statusCode).toBe(StatusCodes.NOT_FOUND);
    expect(nested.statusCode).toBe(StatusCodes.NOT_FOUND);
    expect(rootLoader).toHaveBeenCalled();
    expect(mainLoader).not.toHaveBeenCalled();
    expect(orderLoader).not.toHaveBeenCalled();
  });
});
