import * as migration_20241209_140719 from './20241209_140719';
import * as migration_20241213_180817 from './20241213_180817';
import * as migration_20250329_133118 from './20250329_133118';
import * as migration_20250526_044058 from './20250526_044058';

export const migrations = [
  {
    up: migration_20241209_140719.up,
    down: migration_20241209_140719.down,
    name: '20241209_140719',
  },
  {
    up: migration_20241213_180817.up,
    down: migration_20241213_180817.down,
    name: '20241213_180817',
  },
  {
    up: migration_20250329_133118.up,
    down: migration_20250329_133118.down,
    name: '20250329_133118',
  },
  {
    up: migration_20250526_044058.up,
    down: migration_20250526_044058.down,
    name: '20250526_044058'
  },
];
