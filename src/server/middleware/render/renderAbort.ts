import type { Response } from 'express';

export const SSR_RENDER_TIMEOUT_MS = 10_000;

export const beginRenderAbort = (response: Response, timeoutMs = SSR_RENDER_TIMEOUT_MS) => {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort(new DOMException('The SSR render timed out', 'TimeoutError'));
  }, timeoutMs);

  const onClose = () => {
    if (!response.writableFinished) {
      controller.abort(new DOMException('The client disconnected', 'AbortError'));
    }
  };

  response.on('close', onClose);

  return {
    signal: controller.signal,
    finish: () => {
      clearTimeout(timeout);
      response.off('close', onClose);
    },
  };
};
