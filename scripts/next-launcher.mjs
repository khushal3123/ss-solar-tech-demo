import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

function parseCliArgs(rawArgs) {
  let mode = 'dev';
  let port = Number(process.env.PORT || '3000') || 3000;
  let hostname = '0.0.0.0';

  let i = 0;
  if (rawArgs[0] === 'dev' || rawArgs[0] === 'start' || rawArgs[0] === 'build') {
    mode = rawArgs[0];
    i = 1;
  }

  for (; i < rawArgs.length; i++) {
    const arg = rawArgs[i];
    if (!arg || arg === '--') continue;

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
        const parsed = Number(nextVal);
        if (Number.isFinite(parsed) && parsed > 0) {
          port = parsed;
        }
        i++;
      }
      continue;
    }

    if (arg.startsWith('--port=')) {
      const parsed = Number(arg.slice('--port='.length));
      if (Number.isFinite(parsed) && parsed > 0) {
        port = parsed;
      }
      continue;
    }
  }

  return { mode, port, hostname };
}

const { mode, port, hostname } = parseCliArgs(process.argv.slice(2));
const nextBin = path.join(projectRoot, 'node_modules', '.bin', 'next');

if (mode === 'build') {
  const buildChild = spawn(nextBin, ['build'], {
    cwd: projectRoot,
    stdio: ['ignore', 'inherit', 'inherit'],
    env: {
      ...process.env,
      NODE_ENV: 'production',
      NEXT_TELEMETRY_DISABLED: '1',
    },
  });

  buildChild.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }
    if (code !== 0) {
      process.exit(code ?? 1);
      return;
    }

    const standaloneDir = path.join(projectRoot, '.next', 'standalone');
    const staticDir = path.join(projectRoot, '.next', 'static');
    if (!fs.existsSync(standaloneDir) || !fs.existsSync(staticDir)) {
      console.error('Next.js standalone build artifacts (.next/standalone or .next/static) are missing.');
      process.exit(1);
    }
    process.exit(0);
  });
} else {
  const nextArgs = [mode, '-p', String(port), '-H', hostname];

  const child = spawn(nextBin, nextArgs, {
    cwd: projectRoot,
    stdio: ['ignore', 'inherit', 'inherit'],
    env: {
      ...process.env,
      NODE_ENV: mode === 'start' ? 'production' : 'development',
      NEXT_TELEMETRY_DISABLED: '1',
    },
  });

  const forwardSignal = (signal) => {
    if (!child.killed) {
      child.kill(signal);
    }
  };

  process.on('SIGINT', () => forwardSignal('SIGINT'));
  process.on('SIGTERM', () => forwardSignal('SIGTERM'));

  child.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
    } else {
      process.exit(code ?? 0);
    }
  });
}
