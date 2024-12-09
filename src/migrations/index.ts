import * as migration_20241209_140719 from './20241209_140719';

export const migrations = [
  {
    up: migration_20241209_140719.up,
    down: migration_20241209_140719.down,
    name: '20241209_140719'
  },
];
