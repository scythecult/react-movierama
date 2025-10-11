import { createContext } from 'react';
import type { CreateAppStore } from '../../store/appStore';

export const AppStoreContext = createContext<CreateAppStore | null>(null);
