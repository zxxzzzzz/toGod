import random from 'random';
import * as ATTR from './attr';
import * as GOOD from './good';
import { Referee } from './referee';
import * as R from 'ramda';
import { Damage } from './damage';
import { SkillType } from '../enum/skill';

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
  physicsDefensePoint: ATTR.PhysicsDefensePoint;
  magicAttackPoint: ATTR.MagicAttackPoint;
  magicDefensePoint: ATTR.MagicDefensePoint;
  mp: ATTR.MagicPoint;
  criticalHitPoint: ATTR.CriticalHitPoint;
  criticalHitDamagePoint: ATTR.CriticalHitDamagePoint;
  criticalDefensePoint: ATTR.CriticalDefensePoint;
  speedPoint: ATTR.SpeedPoint;
  weaponList: GOOD.Weapon[];
  skillList: GOOD.Skill[];
  stateList: GOOD.State[];
  constructor(p: {
    name: string;
    speedPoint: number;
    healthPoint: number;
    criticalHitPoint: number;
    criticalDefensePoint: number;
    physicsAttackPoint: number;
    physicsDefensePoint: number;
    magicAttackPoint: number;
    magicDefensePoint: number;
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
    this.physicsDefensePoint = new ATTR.PhysicsDefensePoint({ n: p.physicsDefensePoint });
    this.magicAttackPoint = new ATTR.MagicAttackPoint({ n: p.magicAttackPoint });
    this.magicDefensePoint = new ATTR.MagicDefensePoint({ n: p.magicDefensePoint });
    this.mp = new ATTR.MagicPoint({ n: 100, max: 100 });
    this.speedPoint = new ATTR.SpeedPoint({ n: p.speedPoint });
    // 装备得武器列表
    this.weaponList = [];
    // 装备得技能列表
    this.skillList = [];
    // 状态列表
    this.stateList = [];
  }
  /**装备武器 */
  addWeapon(weapon: GOOD.Weapon) {
    console.log(this.name, '装备了武器', weapon.name);
    weapon.effect();
    this.weaponList.push(weapon);
  }
  /**装备技能 */
  addSkill(skill: GOOD.Skill) {
    console.log(this.name, '装备了技能', skill.name);
    skill.effect();
    this.skillList.push(skill);
  }

  getAttr() {
    const weaponAttr = {
      physicsAttackPoint: this.weaponList.map((w) => w.physicsAttackPoint.count).reduce((a, b) => a + b, 0),
      healthPoint: this.weaponList.map((w) => w.healthPoint.count).reduce((a, b) => a + b, 0),
      mp: this.weaponList.map((w) => w.mp.count).reduce((a, b) => a + b, 0),
      criticalHitPoint: this.weaponList.map((w) => w.criticalHitPoint.count).reduce((a, b) => a + b, 0),
      criticalHitDamagePoint: this.weaponList.map((w) => w.criticalHitDamagePoint.count).reduce((a, b) => a + b, 0),
      criticalDefensePoint: this.weaponList.map((w) => w.criticalDefensePoint.count).reduce((a, b) => a + b, 0),
      magicAttackPoint: this.weaponList.map((w) => w.magicAttackPoint.count).reduce((a, b) => a + b, 0),
    };
    return {
      physicsAttackPoint: this.physicsAttackPoint.count + weaponAttr.physicsAttackPoint,
      healthPoint: this.healthPoint.count + weaponAttr.healthPoint,
      mp: this.mp.count + weaponAttr.mp,
      criticalHitPoint: this.criticalHitPoint.count + weaponAttr.criticalHitPoint,
      criticalHitDamagePoint: this.criticalHitDamagePoint.count + weaponAttr.criticalHitDamagePoint,
      criticalDefensePoint: this.criticalDefensePoint.count + weaponAttr.criticalDefensePoint,
      magicAttackPoint: this.magicAttackPoint.count + weaponAttr.magicAttackPoint,
    };
  }
  /**获取伤害值 */
  getDamage() {
    const attr = this.getAttr();
    const filterSkillList = this.getCanUseSkillList();
    if (filterSkillList.length) {
      // 使用技能
      const skillRandom = random.int(0, filterSkillList.length);
      const skillDamage = this.useSkill(filterSkillList[skillRandom]);
      return new Damage({
        physicsAttack: attr.physicsAttackPoint + skillDamage.physicsAttack.count,
        magicAttack: skillDamage.magicAttack.count,
        from: this,
        desc: skillDamage.desc,
      });
    } else {
      // 普通攻击
      return new Damage({
        physicsAttack: attr.physicsAttackPoint,
        magicAttack: attr.magicAttackPoint,
        from: this,
        desc: '普通攻击:',
      });
    }
  }
  // 遭受伤害
  inDamage(damage: Damage) {
    const physicsAttack = damage.physicsAttack.count - this.physicsDefensePoint.count;
    const magicAttack = damage.magicAttack.count - this.magicDefensePoint.count;
    return new Damage({ physicsAttack: physicsAttack, magicAttack: magicAttack, from: damage.from, desc: damage.desc });
  }
  getCanUseSkillList() {
    const mp = this.mp.count;
    return this.skillList.filter((s) => s.skillType === SkillType.active && mp >= s.magicPointCost);
  }
  useSkill(skill: GOOD.Skill | undefined) {
    if (!skill) {
      return new Damage({ physicsAttack: 0, magicAttack: 0, from: this, desc: '' });
    }
    this.mp.count += skill.magicPointCost;
    skill.effect();
    return new Damage({
      physicsAttack: skill.physicsAttackPoint.count,
      magicAttack: skill.magicAttackPoint.count,
      from: this,
      desc: '使用技能:' + skill.name,
    });
  }
  isDead() {
    return this.healthPoint.count <= 0;
  }
}
