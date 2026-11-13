import { isCommonAssetRequest, type UnhandledFrameHandle } from 'msw';

const IGNORED_HOSTS = ['kinomax', 'ip-api.com'];

const IGNORED_PATHS = ['/static/', '/styles', '/client', '/src/'];

const isIgnoredRequest = (request: Request) => {
  const url = new URL(request.url);

  return (
    isCommonAssetRequest(request) ||
    IGNORED_HOSTS.some((host) => url.hostname.includes(host)) ||
    IGNORED_PATHS.some((path) => url.pathname.includes(path))
  );
};

export const onUnhandledFrame: UnhandledFrameHandle = ({ frame, defaults }) => {
  if (frame.protocol !== 'http') {
    defaults.warn();

    return;
  }

  const request = (frame.data as { request?: Request }).request;

  if (!request) {
    defaults.warn();

    return;
  }

  if (isIgnoredRequest(request)) {
    return;
  }

  defaults.warn();
};

export const mockServerOptions = {
  onUnhandledFrame,
};
