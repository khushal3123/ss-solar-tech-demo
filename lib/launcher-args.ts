export interface NormalizedNextArgs {
  mode: 'dev' | 'start';
  port: string;
  hostname: string;
  nextCliArgs: string[];
}

/**
 * Normalizes CLI flags (including Vite-style --host / --port flags passed by
 * container supervisors) into valid Next.js CLI arguments.
 */
export function normalizeNextCliArgs(
  rawArgs: string[],
  defaultPort: string = '3000',
  defaultHostname: string = '0.0.0.0'
): NormalizedNextArgs {
  let mode: 'dev' | 'start' = 'dev';
  let port = defaultPort;
  let hostname = defaultHostname;

  let i = 0;
  if (rawArgs[0] === 'dev' || rawArgs[0] === 'start') {
    mode = rawArgs[0];
    i = 1;
  }

  for (; i < rawArgs.length; i++) {
    const arg = rawArgs[i];
    if (!arg || arg === '--') {
      continue;
    }

    if (arg === '--host' || arg === '--hostname' || arg === '-H') {
      const nextVal = rawArgs[i + 1];
      if (nextVal && !nextVal.startsWith('-')) {
        hostname = nextVal;
        i++;
      } else {
        hostname = '0.0.0.0';
      }
      continue;
    }

    if (arg.startsWith('--host=')) {
      hostname = arg.slice('--host='.length) || '0.0.0.0';
      continue;
    }

    if (arg.startsWith('--hostname=')) {
      hostname = arg.slice('--hostname='.length) || '0.0.0.0';
      continue;
    }

    if (arg === '--port' || arg === '-p') {
      const nextVal = rawArgs[i + 1];
      if (nextVal && !nextVal.startsWith('-')) {
        port = nextVal;
        i++;
      }
      continue;
    }

    if (arg.startsWith('--port=')) {
      port = arg.slice('--port='.length) || defaultPort;
      continue;
    }
  }

  return {
    mode,
    port,
    hostname,
    nextCliArgs: [mode, '-p', port, '-H', hostname],
  };
}
