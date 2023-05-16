import { FightStep } from '@/enum/fight';
import { Person } from './person';
import * as R from 'ramda';

/** 战斗裁判，安排一整局的战斗 */
export class Referee {
  turnCount = 0;
  p1List: Person[];
  p2List: Person[];
  private speedCache: { p: Person; speed: number }[] = [];
  constructor(p: { p1List: Person[]; p2List: Person[] }) {
    this.p1List = p.p1List;
    this.p2List = p.p2List;
    this.speedCache = [...this.p1List, ...this.p2List].map((d) => {
      return { p: d, speed: 0 };
    });
  }
  fight() {
    // 战斗开始
    this.fightStart()
    while (this.isOver()) {
      // 回合开始
      this.roundStart()
      // 回合结束
      this.roundEnd()
    }
    this.fightEnd()
    console.log(123);
    // 战斗结束
  }
  isOver() {
    return this.p1List.every((p) => p.isDead()) || this.p2List.every((p) => p.isDead());
  }
  /**回合开始 */
  roundStart() {
    // 回合开始
    const speedMax = this.getMaxSpeed();
    // 状态结算
    this.p1List.forEach((p) => p.stateList.filter((s) => s.step === FightStep.roundStart).forEach((s) => s.effect()));
    this.p2List.forEach((p) => p.stateList.filter((s) => s.step === FightStep.roundStart).forEach((s) => s.effect()));
    // 行动阶段
    // 获取可以行动的人
    this.speedCache = this.speedCache.map((d) => ({ ...d, speed: d.speed + d.p.getSpeed() }));
    const actionPersonList = this.speedCache.filter(s => s.speed >= speedMax)
    actionPersonList.forEach((s) => {
      const damage = s.p.action()
      s.speed = 0
    })
    // 回合结束
    this.p1List.forEach((p) => p.stateList.filter((s) => s.step === FightStep.roundEnd).forEach((s) => s.effect()));
    this.p2List.forEach((p) => p.stateList.filter((s) => s.step === FightStep.roundEnd).forEach((s) => s.effect()));
  }
  roundEnd(){
    this.p1List.forEach((p) => p.stateList.filter((s) => s.step === FightStep.roundEnd).forEach((s) => s.effect()));
    this.p2List.forEach((p) => p.stateList.filter((s) => s.step === FightStep.roundEnd).forEach((s) => s.effect()));
  }
  fightStart() {}
  fightEnd() {}

  /**获取战斗中速度最快的人，以它作为速度的阈值，如果有人能达到这个值，即可触发行动 */
  getMaxSpeed() {
    return Math.max(...this.p1List.map((p) => p.speedPoint.count), ...this.p2List.map((p) => p.speedPoint.count));
  }
  // 获取对手
  getRival(p: Person) {
    if (this.p1List.some((p1) => p1 === p)) {
      return this.p2List;
    }
    return this.p1List;
  }
}
