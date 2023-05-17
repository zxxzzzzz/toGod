import { Person } from '../src/class/person';
import { Referee } from '../src/class/referee';
// import { describe, expect, test } from '@jest/globals';

const p1 = new Person({
  name: '张三',
  py: 1,
  power: 1,
  magic: 1,
  endurance: 1,
  agile: 1,
  level:1
});
const p2 = new Person({
  name: '李四',
  py: 1,
  power: 1,
  magic: 1,
  endurance: 1,
  agile: 2,
  level:1
});
const referee = new Referee({ p1List: [p1], p2List: [p2] });

test('123', () => {
  referee.fight();
});
