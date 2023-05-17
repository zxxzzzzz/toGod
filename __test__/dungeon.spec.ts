import { Person } from '../src/class/person';
import { Referee } from '../src/class/referee';
import { Dungeon } from '@/class/dungeon';



const dungeon = new Dungeon({
  name: '地牢1',
  enemyList: [
    [
      new Person({
        name: '哥布林1',
        py: 1,
        power: 1,
        magic: 1,
        endurance: 1,
        agile: 1,
        level: 1,
      }),
      new Person({
        name: '哥布林2',
        py: 1,
        power: 1,
        magic: 1,
        endurance: 1,
        agile: 1,
        level: 1,
      }),
      new Person({
        name: '哥布林3',
        py: 1,
        power: 1,
        magic: 1,
        endurance: 1,
        agile: 1,
        level: 1,
      }),
    ],
  ],
});

test('123', () => {
  dungeon.enter([new Person({
    name: '李四',
    py: 10,
    power: 1,
    magic: 1,
    endurance: 1,
    agile: 2,
    level: 1,
  })]);
});
