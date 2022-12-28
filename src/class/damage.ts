import { MagicAttackPoint, PhysicsAttackPoint } from './attr';
import { Person } from './person';

export class Damage {
  physicsAttack: PhysicsAttackPoint;
  magicAttack: MagicAttackPoint;
  from: Person;
  desc: string;
  // 伤害的目标数量
  targetCount = 1;
  constructor(p: { physicsAttack: number; magicAttack: number; from: Person; desc: string; targetCount?: number }) {
    this.physicsAttack = new PhysicsAttackPoint({ n: p.physicsAttack });
    this.magicAttack = new MagicAttackPoint({ n: p.magicAttack });
    this.from = p.from;
    this.desc = p.desc;
    this.targetCount = p?.targetCount || 1;
  }
}
