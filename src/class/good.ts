import { GoodType, Quality } from '../enum/good';
import { SkillType } from '../enum/skill';
import { FightStep } from '../enum/fight';
import * as ATTR from './attr';
import { Damage } from './damage';
import { Person } from './person';

/**物品base */
class GoodBase {
  name: string;
  type: GoodType;
  constructor(p: { name: string; type: GoodType }) {
    this.name = p.name;
    this.type = p.type;
  }
}

/**药 */
export class Medicine {}

/**功法 */
export class BasicManeuvers {}

/**状态 */
export class State {
  turn: number;
  step:FightStep;
  constructor(p: { turn: number,step:FightStep }) {
    this.turn = p.turn;
    this.step = p.step
  }
  effect() {}
}

/**武器 */
export class Weapon {
  healthPoint: ATTR.HealthPoint;
  physicsAttackPoint: ATTR.PhysicsAttackPoint;
  magicAttackPoint: ATTR.MagicAttackPoint;
  mp: ATTR.MagicPoint;
  criticalHitPoint: ATTR.CriticalHitPoint;
  criticalHitDamagePoint: ATTR.CriticalHitDamagePoint;
  criticalDefensePoint: ATTR.CriticalDefensePoint;
  speedPoint: ATTR.SpeedPoint;
  name: string;
  constructor(p: {
    name: string;
    speedPoint: number;
    healthPoint: number;
    criticalHitPoint: number;
    criticalDefensePoint: number;
    physicsAttackPoint: number;
    magicAttackPoint: number;
  }) {
    this.healthPoint = new ATTR.HealthPoint({ n: p.healthPoint, max: p.healthPoint });
    this.criticalHitPoint = new ATTR.CriticalHitPoint({ n: p.criticalHitPoint });
    this.criticalHitDamagePoint = new ATTR.CriticalHitDamagePoint({ n: 2 });
    this.criticalDefensePoint = new ATTR.CriticalDefensePoint({ n: p.criticalDefensePoint });
    this.physicsAttackPoint = new ATTR.PhysicsAttackPoint({ n: p.physicsAttackPoint });
    this.magicAttackPoint = new ATTR.MagicAttackPoint({ n: p.magicAttackPoint });
    this.mp = new ATTR.MagicPoint({ n: 100, max: 100 });
    this.speedPoint = new ATTR.SpeedPoint({ n: p.speedPoint });
    this.name = p.name;
  }
  effect() {}
}

/**技能 */
export class Skill extends GoodBase {
  name: string;
  skillType: SkillType;
  physicsAttackPoint: ATTR.PhysicsAttackPoint;
  magicAttackPoint: ATTR.MagicAttackPoint;
  magicPointCost: number;
  cdTurn: number;
  turn: number;
  constructor(p: {
    name: string;
    type: SkillType;
    physicsAttack: number;
    quality: Quality;
    magicPointCost: number;
    cdTurn: number;
    magicAttack: number;
  }) {
    super({ name: p.name, type: GoodType.skill });
    this.name = p.name;
    this.skillType = p.type;
    this.magicPointCost = p.magicPointCost;
    this.physicsAttackPoint = new ATTR.PhysicsAttackPoint({ n: p.physicsAttack });
    this.magicAttackPoint = new ATTR.MagicAttackPoint({ n: p.magicAttack });
    this.cdTurn = p.cdTurn;
    this.turn = 0;
  }
  effect() {}
}

/**背包 */
export class Bag {
  goodList: GoodBase[];
  constructor() {
    this.goodList = [];
  }
}
