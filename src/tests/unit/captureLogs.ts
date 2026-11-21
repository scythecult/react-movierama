import { Writable } from 'node:stream';

type LogRecord = Record<string, unknown>;

export const captureLogs = () => {
  const lines: string[] = [];
  const stream = new Writable({
    write(chunk, _encoding, callback) {
      lines.push(chunk.toString());
      callback();
    },
  });

  const text = () => lines.join('');

  return {
    stream,
    text,
    read: (): LogRecord[] =>
      text()
        .split('\n')
        .filter((line) => line.startsWith('{'))
        .map((line) => JSON.parse(line) as LogRecord),
    clear: () => {
      lines.length = 0;
    },
  };
};
