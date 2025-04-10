import * as migration_20250410_082617 from './20250410_082617';
import * as migration_20250410_122726 from './20250410_122726';

export const migrations = [
  {
    up: migration_20250410_082617.up,
    down: migration_20250410_082617.down,
    name: '20250410_082617',
  },
  {
    up: migration_20250410_122726.up,
    down: migration_20250410_122726.down,
    name: '20250410_122726'
  },
];
