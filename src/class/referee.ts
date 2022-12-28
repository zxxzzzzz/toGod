import { Person } from './person';

/** 战斗裁判，安排一整局的战斗 */
export class Referee {
  turnCount = 0;
  p1List: Person[];
  p2List: Person[];
  constructor(p: { p1List: Person[]; p2List: Person[] }) {
    this.p1List = p.p1List;
    this.p2List = p.p2List;
  }
  fight() {
    // 战斗开始
    // 回合开始
    while(!this.isOver()){
      const p = this.getNextActionPerson()
      p.getDamage()
    }
    // 回合结束
    // 战斗结束
  }
  isOver() {
    return this.p1List.every(p => p.isDead()) || this.p2List.every(p => p.isDead())
  }
  getNextActionPerson():Person{
    return this.p1List[0]
  }
}
