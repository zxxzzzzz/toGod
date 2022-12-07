import { GoodType, Quality } from '@/enum/good';
import { SkillType } from '@/enum/skill';
import { PhysicsAttackPoint } from './attr';
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

/**武器 */
export class Weapon {
  physicsAttack: PhysicsAttackPoint;
  name: string;
  constructor(p: { physicsAttackPoint: number; name: string }) {
    this.physicsAttack = new PhysicsAttackPoint({ n: p.physicsAttackPoint });
    this.name = p.name;
  }
  getDamage() {
    return {
      physicsAttack: this.physicsAttack.count,
      magicAttack: 0,
    };
  }
}

/**技能 */
export class Skill extends GoodBase {
  name: string;
  skillType: SkillType;
  basePhysicsAttackPoint: PhysicsAttackPoint;
  magicPointCost: number;
  cdTurn: number;
  turn: number;
  damageFunc: (p1: Person, p2: Person) => Damage;
  effectFunc: (p1: Person, p2: Person) => void;
  constructor(p: {
    name: string;
    type: SkillType;
    physicsAttack: number;
    damageFunc: (p1: Person, p2: Person) => Damage;
    effectFunc: (p1: Person, p2: Person) => void;
    quality: Quality;
    magicPointCost: number;
    cdTurn: number;
  }) {
    super({ name: p.name, type: GoodType.skill });
    this.name = p.name;
    this.skillType = p.type;
    this.magicPointCost = p.magicPointCost;
    this.basePhysicsAttackPoint = new PhysicsAttackPoint({ n: p.physicsAttack });
    this.damageFunc = p.damageFunc;
    this.effectFunc = p.effectFunc;
    this.cdTurn = p.cdTurn;
    this.turn = 0;
  }
  setEffect(p1: Person, p2: Person) {
    let canUse = true;
    if (p1.mp.count < this.magicPointCost) {
      canUse = false;
    }
    if (this.turn > 0) {
      canUse = false;
    }
    if (!canUse) {
      this.turn -= 1;
      return;
    }
    this.turn = this.cdTurn;
    this.effectFunc(p1, p2);
  }
  getDamage(p1: Person, p2: Person) {
    return this.damageFunc(p1, p2);
  }
}

/**背包 */
export class Bag {
  goodList: GoodBase[];
  constructor() {
    this.goodList = [];
  }
}
