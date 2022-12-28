import { MagicAttackPoint, PhysicsAttackPoint } from './attr';
import { Person } from './person';

export class Damage {
  physicsAttack: PhysicsAttackPoint;
  magicAttack: MagicAttackPoint;
  from: Person;
  desc: string;
  constructor(p: { physicsAttack: number; magicAttack: number; from: Person,desc: string }) {
    this.physicsAttack = new PhysicsAttackPoint({ n: p.physicsAttack });
    this.magicAttack = new MagicAttackPoint({ n: p.magicAttack });
    this.from = p.from;
    this.desc = p.desc
  }
  getDamage() {
    return {
      physicsAttack: this.physicsAttack,
      magicAttack: this.magicAttack,
      from: this.from,
    };
  }
}
