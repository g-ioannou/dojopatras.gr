import * as migration_20250328_193657 from './20250328_193657';
import * as migration_20250331_170221 from './20250331_170221';

export const migrations = [
  {
    up: migration_20250328_193657.up,
    down: migration_20250328_193657.down,
    name: '20250328_193657',
  },
  {
    up: migration_20250331_170221.up,
    down: migration_20250331_170221.down,
    name: '20250331_170221'
  },
];
