import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import { performance } from 'node:perf_hooks';

const start = performance.now();

const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
let frame = 0;

const clearLine = () => process.stdout.write('\x1b[2K\r');

let stderr = '';

const runBuild = () =>
  new Promise((resolve, reject) => {
    const tsup = spawn('npx', ['tsup', '--silent'], {
      stdio: ['ignore', 'ignore', 'pipe'],
    });

    tsup.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    tsup.on('close', (code) => {
      if (code === 0) {
        resolve(undefined);
      } else {
        reject(new Error(stderr || `tsup exited with code ${code}`));
      }
    });
  });

process.stdout.write('\n  \x1b[1;36m🚀  Building deepstate-sdk\x1b[0m ');

const spinner = setInterval(() => {
  clearLine();
  process.stdout.write(
    `  \x1b[1;36m🚀  Building deepstate-sdk\x1b[0m \x1b[1;32m${frames[frame]}\x1b[0m`,
  );
  frame = (frame + 1) % frames.length;
}, 80);

try {
  await runBuild();
  clearInterval(spinner);
  clearLine();
} catch (err) {
  clearInterval(spinner);
  clearLine();
  console.error('\n  \x1b[1;31m❌  Build failed\x1b[0m\n');
  if (err.message) console.error(err.message);
  process.exit(1);
}

const files = (await fs.readdir('dist'))
  .filter((name) => !name.endsWith('.map'))
  .sort();

const stats = [];
let totalBytes = 0;

for (const name of files) {
  const stat = await fs.stat(`dist/${name}`);
  totalBytes += stat.size;

  const size =
    stat.size > 1024 ? `${(stat.size / 1024).toFixed(2)} KB` : `${stat.size} B`;

  stats.push({ name, size });
}

const longest = Math.max(...stats.map((s) => s.name.length), 20);

for (const { name, size } of stats) {
  console.log(
    `  \x1b[1;32m✓\x1b[0m \x1b[90mdist/\x1b[0m${name.padEnd(longest)} ${size.padStart(10)}`,
  );
}

const totalSize =
  totalBytes > 1024
    ? `${(totalBytes / 1024).toFixed(2)} KB`
    : `${totalBytes} B`;
const duration = (performance.now() - start).toFixed(0);

console.log(
  `\n  \x1b[1;32m✅  Build complete\x1b[0m — ${totalSize} in ${duration} ms\n`,
);
