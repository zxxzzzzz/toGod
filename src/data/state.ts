import { Damage } from '../class/damage';
import { Skill } from '../class/good';
import { Person } from '../class/person';
import { Quality } from '../enum/good';
import { SkillType } from '../enum/skill';
import { FightStep } from '../enum/fight';
import random from 'random';

export const stateList = [
  {
    name: '回复',
    step:FightStep.roundStart,
    
  },
];
