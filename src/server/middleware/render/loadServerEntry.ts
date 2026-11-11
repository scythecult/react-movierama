import { pathToFileURL } from 'node:url';
import { SERVER_ENTRY_PATH } from '../../../common/constants/common.js';

export type ServerEntryModule = {
  renderSsrTemplate?: unknown;
};

const toServerEntryModule = (loaded: unknown): ServerEntryModule => {
  if (typeof loaded !== 'object' || loaded === null || !('renderSsrTemplate' in loaded)) {
    return {};
  }

  return {
    renderSsrTemplate: loaded.renderSsrTemplate,
  };
};

const importBuiltEntry = async () => toServerEntryModule(await import(pathToFileURL(SERVER_ENTRY_PATH).href));

const isModuleNotFound = (error: unknown) =>
  typeof error === 'object' && error !== null && 'code' in error && error.code === 'ERR_MODULE_NOT_FOUND';

export const loadServerEntry = async (load: () => Promise<ServerEntryModule> = importBuiltEntry) => {
  try {
    return await load();
  } catch (error) {
    if (isModuleNotFound(error)) {
      throw new Error(`SSR entry was not found at ${SERVER_ENTRY_PATH}`, { cause: error });
    }

    throw new Error('SSR entry failed to load', { cause: error });
  }
};
