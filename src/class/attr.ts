// 属性
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




/**体质 */

/**生命 */
export class HealthPoint {
  max: number;
  count: number;
  constructor(p: { n: number; max: number }) {
    this.count = p.n;
    this.max = p.max;
  }
}
/**速度 */
export class SpeedPoint {
  count: number;
  constructor(p: { n: number }) {
    this.count = p.n;
  }
}
/**物攻 */
export class PhysicsAttackPoint {
  count: number;
  constructor(p: { n: number }) {
    this.count = p.n;
  }
}
/**命中率 */
export class HitPoint {
  count: number;
  constructor(p: { n: number }) {
    this.count = p.n;
  }
}
/**闪避率 */
export class DodgePoint {
  count: number;
  constructor(p: { n: number }) {
    this.count = p.n;
  }
}
/**暴击率 */
export class CriticalHitPoint {
  count: number;
  constructor(p: { n: number }) {
    this.count = p.n;
  }
}
/**暴击抵抗 */
export class CriticalDefensePoint {
  count: number;
  constructor(p: { n: number }) {
    this.count = p.n;
  }
}
/**暴击伤害 */
export class CriticalHitDamagePoint {
  count: number;
  constructor(p: { n: number }) {
    this.count = p.n;
  }
}
/**法攻 */
export class MagicAttackPoint {
  count: number;
  constructor(p: { n: number }) {
    this.count = p.n;
  }
}
/**法防 */
export class MagicDefensePoint {
  count: number;
  constructor(p: { n: number }) {
    this.count = p.n;
  }
}
/**物防 */
export class PhysicsDefensePoint {
  count: number;
  constructor(p: { n: number }) {
    this.count = p.n;
  }
}

/**幸运点 */
export class LuckPoint {
  count: number;
  constructor(p: { n: number }) {
    this.count = p.n;
  }
}

/** 魅力*/
export class CharmPoint {
  count: number;
  constructor(p: { n: number }) {
    this.count = p.n;
  }
}
/** 法力*/
export class MagicPoint {
  count: number;
  max: number;
  constructor(p: { n: number; max: number }) {
    this.count = p.n;
    this.max = p.max;
  }
}
