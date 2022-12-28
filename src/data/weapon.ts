import { Weapon } from '@/class/good';
import { Quality } from '@/enum/good';
import random from 'random';

export const weaponList = [
  { physicsAttackPoint: 10, name: '破烂小刀', quality: Quality.white, speedPoint: 0, healthPoint: 0, criticalHitPoint: 0, criticalDefensePoint: 0 },
];

export function getWhiteWeapon() {
  const list = weaponList.filter((w) => w.quality === Quality.white) || [];
  const r = random.int(0, list.length - 1);
  return new Weapon(list[r]);
}
