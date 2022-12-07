import { Person } from '@/class/person';
import { getWhiteSkill } from '@/data/skill';
import { getWhiteWeapon } from '@/data/weapon';

function fightPerson(p1: Person, p2: Person) {
  while (true) {
    if (p1.speedPoint.isMyTurn(p2.speedPoint)) {
      const p1D = p1.getDamage(p2);
      p2.healthPoint.count = p2.healthPoint.count - p1D.magicAttack - p1D.physicsAttack;
      console.log(p1.name, '对', p2.name, '造成', p1D.isCritical ? '暴击' : '', p1D.magicAttack + p1D.physicsAttack, '点伤害');
      if (p2.isDead()) {
        console.log(p2.name, '死亡');
        break;
      }
      p2.speedPoint.add()
    } else {
      const p2D = p2.getDamage(p1);
      p1.healthPoint.count = p1.healthPoint.count - p2D.magicAttack - p2D.physicsAttack;
      console.log(p2.name, '对', p1.name, '造成', p2D.isCritical ? '暴击' : '', p2D.magicAttack + p2D.physicsAttack, '点伤害');
      if (p1.isDead()) {
        console.log(p1.name, '死亡');
        break;
      }
      p1.speedPoint.add()
    }
    p1.speedPoint.reset()
    p2.speedPoint.reset()
    // const p1D = p.getDamage()
  }
}

const p1 = new Person({
  name: '张三',
  speedPoint: 7,
  healthPoint: 100,
  criticalHitPoint: 20,
  criticalDefensePoint: 100,
  physicsAttackPoint: 10,
});
const p2 = new Person({
  name: '李四',
  speedPoint: 5,
  healthPoint: 300,
  criticalHitPoint: 100,
  criticalDefensePoint: 5,
  physicsAttackPoint: 10,
});
p1.addWeapon(getWhiteWeapon());
p1.addSkill(getWhiteSkill())

fightPerson(p1, p2);
