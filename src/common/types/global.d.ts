import type { DehydratedState } from '@tanstack/react-query';
import type { AppStore } from '../../client/lib/store/appStore';

declare global {
  interface Window {
    __pageQueryData__?: DehydratedState;
    __appInitialState__?: Partial<AppStore>;
  }
}
