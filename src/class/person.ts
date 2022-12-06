import random from 'random';
import * as ATTR from './attr';
import * as GOOD from './good';

/**金币 */
class Coin {
  count: number;
  constructor(n: number) {
    this.count = n;
  }
}

/**灵气 */
class Aura {
  count: number;
  constructor(n: number) {
    this.count = n;
  }
}

/**仙缘 */
class XianYuan {
  count: number;
  constructor(n: number) {
    this.count = n;
  }
}

/**等级 */
class Level {
  count: number;
  constructor(n: number) {
    this.count = n;
  }
}

/**经验 */
class Experience {
  count: number;
  level: Level;
  constructor(n: number) {
    this.count = n;
    this.level = new Level(0);
  }
}

/**灵根 */
class LingBase {
  count: number;
  constructor(n: number) {
    this.count = n;
  }
}

// 生命：6666
// 法力：6666
// 速度：666
// 福源：66
// 容貌：66
// 物攻：666
// 法攻：666
// 命中：666
// 暴击率：66%
// 爆伤：66%
// 物防：666
// 法防：666
// 闪避：666
// 抗爆：66%

export class Person {
  name: string;
  level: Level;
  aura: Aura;
  coin: Coin;
  bag: GOOD.Bag;
  healthPoint: ATTR.HealthPoint;
  physicsAttackPoint: ATTR.PhysicsAttackPoint;
  mp: ATTR.MagicPoint;
  criticalHitPoint: ATTR.CriticalHitPoint;
  criticalHitDamagePoint: ATTR.CriticalHitDamagePoint;
  criticalDefensePoint: ATTR.CriticalDefensePoint;
  speedPoint: ATTR.SpeedPoint;
  weaponList: GOOD.Weapon[];
  constructor(p: {
    name: string;
    speedPoint: number;
    healthPoint: number;
    criticalHitPoint: number;
    criticalDefensePoint: number;
    physicsAttackPoint: number;
  }) {
    this.name = p.name;
    this.level = new Level(0);
    this.aura = new Aura(0);
    this.coin = new Coin(0);
    this.bag = new GOOD.Bag();
    this.healthPoint = new ATTR.HealthPoint({ n: p.healthPoint, max: p.healthPoint });
    this.criticalHitPoint = new ATTR.CriticalHitPoint({ n: p.criticalHitPoint });
    this.criticalHitDamagePoint = new ATTR.CriticalHitDamagePoint({ n: 2 });
    this.criticalDefensePoint = new ATTR.CriticalDefensePoint({ n: p.criticalDefensePoint });
    this.physicsAttackPoint = new ATTR.PhysicsAttackPoint({ n: p.physicsAttackPoint });
    this.mp = new ATTR.MagicPoint({ n: 100, max: 100 });
    this.speedPoint = new ATTR.SpeedPoint({ n: p.speedPoint });
    this.weaponList = [];
  }
  /**添加武器 */
  addWeapon(weapon: GOOD.Weapon) {
    console.log(this.name, '装备了', weapon.name);
    this.weaponList.push(weapon);
  }
  /**获取伤害值 */
  getDamage(p2: Person) {
    const randomCritical = random.int(0, 100);
    const weaponDamage = this.getWeaponDamage()
    // 是否暴击
    const isCritical = this.criticalHitPoint.count - p2.criticalDefensePoint.count >= randomCritical;
    // 武器伤害
    return {
      physicsAttack: (this.physicsAttackPoint.count + weaponDamage.physicsAttack) * (isCritical ? this.criticalHitDamagePoint.count : 1),
      magicAttack: 0,
      isCritical,
    };
  }
  getWeaponDamage() {
    const weaponDamage = this.weaponList.reduce(
      (re, weapon) => {
        const wd = weapon.getDamage();
        return { physicsAttack: re.physicsAttack + wd.physicsAttack, magicAttack: re.magicAttack + wd.magicAttack };
      },
      { physicsAttack: 0, magicAttack: 0 }
    );
    return weaponDamage;
  }
  isDead() {
    return this.healthPoint.count <= 0;
  }
}
