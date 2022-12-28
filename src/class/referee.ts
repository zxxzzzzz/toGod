import { Person } from './person';
import * as R from 'ramda';

const SPEED_LIMIT = 1000;
/** 战斗裁判，安排一整局的战斗 */
export class Referee {
  turnCount = 0;
  p1List: Person[];
  p2List: Person[];
  private speedCache: { p: Person; count: number }[] = [];
  constructor(p: { p1List: Person[]; p2List: Person[] }) {
    this.p1List = p.p1List;
    this.p2List = p.p2List;
    this.speedCache = [...this.p1List, ...this.p2List].map((d) => {
      return { p: d, count: 1 / d.speedPoint.count };
    });
  }
  fight() {
    // 战斗开始
    // 回合开始
    while (this.isOver()) {
      const p = this.getNextActionPerson({ add: true });
      if (!p) {
        console.log('战斗结束');
        break;
      }
      const damage = p.getDamage();
      this.getRival(p)
        .slice(0, damage.targetCount)
        .forEach((p2) => {
          const inDamage = p2.inDamage(damage);
          p2.healthPoint.count = p2.healthPoint.count - inDamage.magicAttack.count - inDamage.physicsAttack.count;
          console.log(p2.name, '遭受', inDamage.magicAttack.count + inDamage.physicsAttack.count, '伤害');
          if (p2.isDead()) {
            console.log(p2.name, '死亡');
          }
        });
    }
    // 回合结束
    // 战斗结束
  }
  isOver() {
    return this.p1List.every((p) => p.isDead()) || this.p2List.every((p) => p.isDead());
  }
  // 获取对手
  getRival(p: Person) {
    if (this.p1List.some((p1) => p1 === p)) {
      return this.p2List;
    }
    return this.p1List;
  }
  // 获取下一个执行行为的人
  getNextActionPerson(p: { add: boolean }): Person | undefined {
    const re = this.speedCache.reduce(
      (re, cur) => {
        if (cur.count <= re.count) {
          return cur;
        }
        return re;
      },
      { p: undefined, count: 99 } as { p: Person | undefined; count: number }
    );
    if (p.add && re?.p) {
      re.count = re.count + 1 / re.p.speedPoint.count;
    }
    return re?.p;
  }
}
