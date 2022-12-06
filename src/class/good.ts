import { GoodType } from '@/enum/good';
import { PhysicsAttackPoint } from './attr';

/**药 */
export class Medicine {}

/**功法 */
export class BasicManeuvers {}

/**武器 */
export class Weapon {
  physicsAttack: PhysicsAttackPoint;
  name:string
  constructor(p: { physicsAttackPoint: number; name: string }) {
    this.physicsAttack = new PhysicsAttackPoint({ n: p.physicsAttackPoint });
    this.name = p.name;
  }
  getDamage(){
    return {
      physicsAttack: this.physicsAttack.count,
      magicAttack: 0,
    }
  }
}

/**技能 */
export class Skill {}

/**背包 */
export class Bag {
  goodList: GoodBase[];
  constructor() {
    this.goodList = [];
  }
}

/**物品base */
class GoodBase {
  name: string;
  type: GoodType;
  constructor(p: { name: string; type: GoodType }) {
    this.name = p.name;
    this.type = p.type;
  }
}
