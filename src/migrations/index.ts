import * as migration_20241209_140719 from './20241209_140719';
import * as migration_20241213_180817 from './20241213_180817';
import * as migration_20250329_133118 from './20250329_133118';
import * as migration_20250526_044058 from './20250526_044058';
import * as migration_20250621_053214 from './20250621_053214';
import * as migration_20250621_090857 from './20250621_090857';
import * as migration_20250621_092909 from './20250621_092909';
import * as migration_20250628_105106 from './20250628_105106';
import * as migration_20250712_150809 from './20250712_150809';
import * as migration_20260124_161316 from './20260124_161316';

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
    name: '20250526_044058',
  },
  {
    up: migration_20250621_053214.up,
    down: migration_20250621_053214.down,
    name: '20250621_053214',
  },
  {
    up: migration_20250621_090857.up,
    down: migration_20250621_090857.down,
    name: '20250621_090857',
  },
  {
    up: migration_20250621_092909.up,
    down: migration_20250621_092909.down,
    name: '20250621_092909',
  },
  {
    up: migration_20250628_105106.up,
    down: migration_20250628_105106.down,
    name: '20250628_105106',
  },
  {
    up: migration_20250712_150809.up,
    down: migration_20250712_150809.down,
    name: '20250712_150809',
  },
  {
    up: migration_20260124_161316.up,
    down: migration_20260124_161316.down,
    name: '20260124_161316'
  },
];
