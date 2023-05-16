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
  // 体质：影响HP和速度
  // 力量：影响MP、物理伤害和速度
  // 魔力：影响MP、法术伤害和速度
  // 耐力：影响物理防御、法术防御和速度
  // 敏捷：影响速度
  /**体质 */
  py: number = 0;
  /**力量 */
  power: number = 0;
  /**魔力 */
  magic: number = 0;
  /** 耐力*/
  endurance: number = 0;
  /** 敏捷*/
  agile: number = 0;

  /** 当前生命值*/
  currentHP: number = 0;
  /** 当前魔法值*/
  currentMP: number = 0;

  name: string = '';
  /**等级 */
  level: number = 1;
  /**灵气 */
  aura: number = 0;
  /**金币 */
  coin: number = 0;
  /**背包 */
  bag: GOOD.Bag;
  /**武器列表 */
  weaponList: GOOD.Weapon[];
  /**技能列表 */
  skillList: GOOD.Skill[];
  /**状态列表 */
  stateList: GOOD.State[];
  constructor(p: { name: string; py: number; power: number; magic: number; endurance: number; agile: number; level: number }) {
    this.name = p.name;
    this.level = p.level;
    this.aura = 0;
    this.coin = 0;
    this.bag = new GOOD.Bag();

    this.py = p.py;
    this.power = p.power;
    this.agile = p.agile;
    this.endurance = p.endurance;
    this.magic = p.magic;
    // 装备得武器列表
    this.weaponList = [];
    // 装备得技能列表
    this.skillList = [];
    // 状态列表
    this.stateList = [];
  }
  /**获取最大生命值 */
  getHP() {
    // 体质 * 16+ LV * 35 + 200 + 职业附加 + 装备附加
    return this.py * 16 + this.level * 35 + 200 + 0 + 0;
  }
  /**获取最大 */
  getMP() {
    // MP = 力量 * 1 + 魔力 * 1 + LV * 5 + 200 + 装备附加
    return this.power * 1 + this.magic * 1 + this.level * 5 + 200 + 0;
  }
  /**获取物理攻击 */
  getPhysicsAttack() {
    // 物理攻击 = 力量 * 1 + LV * 10 + 80 + 职业附加 + 装备附加
    return this.power * 1 + this.level * 10 + 80 + 0 + 0;
  }
  /**获取魔法攻击 */
  getMagicAttack() {
    // 法术攻击 = 魔力 * 1 + LV * 10 + 80 + 职业附加 + 装备附加
    return this.power * 1 + this.level * 10 + 80 + 0 + 0;
  }
  /**获取物理防御 */
  getPhysicsDefense() {
    // 物理防御 = 耐力 * 2 + LV * 5 + 职业附加 + 装备附加
    return this.endurance * 2 + this.level * 5 + 0 + 0;
  }
  /**获取魔法防御 */
  getMagicDefense() {
    // 魔法防御 = 耐力 * 2 + LV * 5 + 职业附加 + 装备附加
    return this.endurance * 2 + this.level * 5 + 0 + 0;
  }
  /**获取速度 */
  getSpeed() {
    // 速度 = 体质 * 0.2 + 力量 * 0.2 + 魔力 * 0.2 + 耐力 * 0.2 + 敏捷 * 1.5 + 职业附加 + 装备附加
    return this.py * 0.2 + this.power * 0.2 + this.magic * 0.2 + this.endurance * 0.2 + this.agile * 1.5 + 0 + 0;
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

  isDead() {
    return this.currentHP <= 0;
  }
  /**普通攻击 */
  attack() {
    return {
      physicsAttack: this.getPhysicsAttack(),
      magicAttack: this.getMagicAttack(),
      // 攻击范围
      count:1
    };
  }
  /**行动 做一个比较好的选择*/
  action() {
    // 先技能
    // const skill = this.skillList.filter((s) => s.turn === s.cdTurn)?.[0];
    // if (skill) {
    //   return skill.effect();
    // }
    // 再普攻
    return this.attack();
  }
}
