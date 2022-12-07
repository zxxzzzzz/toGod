import { MagicAttackPoint, PhysicsAttackPoint } from './attr';

export class Damage {
  physicsAttack: PhysicsAttackPoint;
  magicAttack: MagicAttackPoint;
  constructor(p: { physicsAttack: number; magicAttack: number }) {
    this.physicsAttack = new PhysicsAttackPoint({ n: p.physicsAttack });
    this.magicAttack = new MagicAttackPoint({ n: p.magicAttack });
  }
  getDamage() {
    return {
      physicsAttack: this.physicsAttack,
      magicAttack: this.magicAttack,
    };
  }
}
