import { Person } from './person';
import { Referee } from './referee';

/**副本 地牢*/
export class Dungeon {
  enemyList: Person[][];
  name: string;
  constructor(p: { enemyList: Person[][]; name: string }) {
    this.enemyList = p.enemyList;
    this.name = p.name
  }
  /**进入地牢前 */
  beforeEnterDungeon() {}
  /**离开地牢前 */
  beforeLeaveDungeon() {}
  /**进入地牢 */
  enter(pList: Person[]) {
    this.enemyList.forEach((enemy) => {
      const referee = new Referee({ p1List: pList, p2List: enemy });
      referee.fight();
    });
    if (pList.some((p) => !p.isDead())) {
      console.log('地牢讨伐完成');
    } else {
      console.log('地牢讨伐失败');
    }
  }
}
