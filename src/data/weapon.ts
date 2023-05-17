import { WeaponType } from '@/enum/weapon';
import { Weapon } from '../class/weapon';
import { Quality } from '../enum/good';
import random from 'random';

export type WeaponData = {
  py: number;
  power: number;
  magic: number;
  endurance: number;
  agile: number;
  physicsAttack: number;
  magicAttack: number;
  physicsDefense: number;
  magicDefense: number;
  weaponType: WeaponType.oneHand;
  // 速度
  speed: number;
  // 暴击率
  criticalRate: number;
  name: string;
  quality: Quality;
  id: string;
  HP: number;
  MP: number;
  // 攻击范围（可攻击的人数）
  count?: number;
  // 描述
  desc: string;
  /**武器装备前 */
  beforeAdd?: () => {};
  /**武器装备后 */
  afterAdd?: () => {};
  /**武器移除后 */
  afterRemove?: () => {};
  /**武器移除前 */
  beforeRemove?: () => {};
  /**战斗特效 */
  fightEffect?: () => {};
};

export const weaponList: WeaponData[] = [
  {
    py: 0,
    power: 0,
    magic: 0,
    endurance: 0,
    agile: 0,
    physicsAttack: 10,
    physicsDefense: 0,
    magicAttack: 0,
    magicDefense: 0,
    speed: 0,
    criticalRate: 0,
    name: '破烂小刀',
    quality: Quality.white,
    id: '000001',
    desc: '一把普通小刀，甚至有点生锈',
    weaponType: WeaponType.oneHand,
    HP: 0,
    MP: 0,
  },
];

export function getWhiteWeapon() {
  const list = weaponList.filter((w) => w.quality === Quality.white) || [];
  const r = random.int(0, list.length - 1);
  return new Weapon(list[r]);
}
