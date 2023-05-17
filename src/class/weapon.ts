import { WeaponData } from '@/data/weapon';
import { GoodType } from '@/enum/good';

/**武器 */
export class Weapon {
  p: WeaponData;
  type = GoodType.weapon;
  constructor(p: WeaponData) {
    this.p = p;
  }
  /**武器装备前 */
  beforeAdd() {
    this.p?.beforeAdd?.();
  }
  /**武器装备后 */
  afterAdd() {
    this.p?.afterAdd?.();
  }
  /**武器移除后 */
  afterRemove() {
    this.p?.afterRemove?.();
  }
  /**武器移除前 */
  beforeRemove() {
    this.p?.beforeRemove?.();
  }

  /**战斗特效 */
  fightEffect() {
    this.p?.fightEffect?.();
  }
  getPhysicsAttack() {
    return this.p.physicsAttack;
  }
  getPhysicsDefense() {
    return this.p.physicsDefense;
  }
  getMagicAttack() {
    return this.p.magicAttack;
  }
  getMagicDefense() {
    return this.p.magicDefense;
  }
  getHP() {
    return this.p.HP;
  }
  getMP() {
    return this.p.MP;
  }
  getAttackRange(){
    return this.p.count || 1
  }
}
