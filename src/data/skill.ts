import { Damage } from '../class/damage';
import { Skill } from '../class/good';
import { Person } from '../class/person';
import { Quality } from '../enum/good';
import { SkillType } from '../enum/skill';
import random from 'random';

export const skillList = [
  {
    name: '火球术',
    type: SkillType.active,
    physicsAttack: 50,
    magicAttack: 50,
    cdTurn: 3,
    magicPointCost: 30, 
    quality: Quality.white,
  },
];

export function getWhiteSkill() {
  const list = skillList.filter((w) => w.quality === Quality.white) || [];
  const r = random.int(0, list.length - 1);
  return new Skill(list[r]);
}
