import { createAppStore, toPersistedAppState } from './AppStore';

describe('createAppStore', () => {
  test('should keep request stores independent', () => {
    const first = createAppStore();
    const second = createAppStore();

    first.setState({ cartTotalPrice: 450 });

    expect(second.getState().cartTotalPrice).toBe(0);
  });

  test('should persist only serializable cart data', () => {
    const store = createAppStore();

    store.setState({ cartTotalPrice: 450 });

    expect(toPersistedAppState(store.getState())).toEqual({
      cart: [],
      cartTotalPrice: 450,
    });
  });
});
