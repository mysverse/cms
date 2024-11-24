import * as migration_20241124_213225 from './20241124_213225';

export const migrations = [
  {
    up: migration_20241124_213225.up,
    down: migration_20241124_213225.down,
    name: '20241124_213225'
  },
];
