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


/**功法 */
export class State {
  turn:number
  constructor(p:{turn:number}){
    this.turn = p.turn
  }
  effect(p:{p1List:Person[], p2List:Person[]}){

  }
}

/**武器 */
export class Weapon {
  physicsAttack: PhysicsAttackPoint;
  name: string;
  constructor(p: { physicsAttackPoint: number; name: string }) {
    this.physicsAttack = new PhysicsAttackPoint({ n: p.physicsAttackPoint });
    this.name = p.name;
  }
  effect(){
    
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
  effect() {
    
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
