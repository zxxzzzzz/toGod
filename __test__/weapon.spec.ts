import { Weapon } from '@/class/weapon';
import { Quality } from '@/enum/good';

// import { describe, expect, test } from '@jest/globals';

const data = {
  py: 0,
  power: 0,
  magic: 0,
  endurance: 0,
  agile: 0,
  name: '破烂小刀',
  quality: Quality.white,
  id: '000001',
  desc: '一把普通小刀，甚至有点生锈',
}

const w = new Weapon(data);

describe('武器', () => {
  test('武器伤害', () => {});
});
