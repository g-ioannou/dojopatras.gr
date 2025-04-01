import * as migration_20250401_175537 from './20250401_175537';
import * as migration_20250401_180714 from './20250401_180714';

export const migrations = [
  {
    up: migration_20250401_175537.up,
    down: migration_20250401_175537.down,
    name: '20250401_175537',
  },
  {
    up: migration_20250401_180714.up,
    down: migration_20250401_180714.down,
    name: '20250401_180714'
  },
];
