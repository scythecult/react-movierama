import { createContext } from 'react';
import type { UseAppStore } from '../../store/appStore';

export const AppStoreContext = createContext<UseAppStore | null>(null);
