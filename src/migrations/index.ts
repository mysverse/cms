import * as migration_20241209_140719 from './20241209_140719';
import * as migration_20241213_180817 from './20241213_180817';

export const migrations = [
  {
    up: migration_20241209_140719.up,
    down: migration_20241209_140719.down,
    name: '20241209_140719',
  },
  {
    up: migration_20241213_180817.up,
    down: migration_20241213_180817.down,
    name: '20241213_180817'
  },
];
