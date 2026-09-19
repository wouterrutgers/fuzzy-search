import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import process from 'node:process';

const version = process.argv[2];

if (!/^\d+\.\d+\.\d+$/.test(version ?? '')) {
  throw new Error('Usage: pnpm release <major.minor.patch>');
}

if (execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim()) {
  throw new Error('Commit or discard local changes before releasing.');
}

if (execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim() !== 'master') {
  throw new Error('Releases must be created from master.');
}

if (execFileSync('git', ['tag', '--list', `v${version}`], { encoding: 'utf8' }).trim()) {
  throw new Error(`Tag v${version} already exists.`);
}

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const changelog = readFileSync('CHANGELOG.md', 'utf8');
const unreleasedSection = changelog.split(/^## /m).find(function isUnreleased(section) {
  return section.startsWith('Unreleased\n');
});

if (packageJson.version === version) {
  throw new Error(`Package version is already ${version}.`);
}

if (!unreleasedSection?.replace('Unreleased\n', '').trim()) {
  throw new Error('Add release notes under Unreleased before releasing.');
}

packageJson.version = version;
writeFileSync('package.json', `${JSON.stringify(packageJson, null, 2)}\n`);
writeFileSync('CHANGELOG.md', changelog.replace('## Unreleased\n', `## Unreleased\n\n## ${version} (${new Date().toISOString().slice(0, 10)})\n`));

for (const script of ['lint', 'test', 'build', 'test:package']) {
  execFileSync('pnpm', [script], { stdio: 'inherit' });
}

execFileSync('git', ['add', 'package.json', 'CHANGELOG.md'], { stdio: 'inherit' });
execFileSync('git', ['commit', '-m', `release v${version}`], { stdio: 'inherit' });
execFileSync('git', ['tag', `v${version}`], { stdio: 'inherit' });
execFileSync('git', ['push', 'origin', 'master'], { stdio: 'inherit' });
execFileSync('git', ['push', 'origin', `v${version}`], { stdio: 'inherit' });
