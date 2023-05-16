import { Person } from '../src/class/person';
import { Referee } from '../src/class/referee';
// import { describe, expect, test } from '@jest/globals';

const p1 = new Person({
  name: '张三',
  speedPoint: 7,
  healthPoint: 100,
  criticalHitPoint: 20,
  criticalDefensePoint: 100,
  physicsAttackPoint: 10,
  magicAttackPoint: 0,
  magicDefensePoint: 0,
  physicsDefensePoint: 1,
});
const p2 = new Person({
  name: '李四',
  magicAttackPoint: 0,
  speedPoint: 5,
  healthPoint: 300,
  criticalHitPoint: 100,
  criticalDefensePoint: 5,
  physicsAttackPoint: 10,
  magicDefensePoint: 0,
  physicsDefensePoint: 1,
});
const referee = new Referee({ p1List: [p1], p2List: [p2] });

test('123', () => {
  referee.fight();
});
