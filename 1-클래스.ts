// 클래스 데코레이터
// 생성자 함수를 유일한 인수로 받는다.
function ClassDecorator(constructor: typeof PersonClass) {
  console.log('class decorator initialized');

  const method = constructor.prototype.act;
  constructor.prototype.act = function (action: string) {
    method.call(this, `${action} in decorator`); // method를 호출하면서 this를 전달
    console.log('decorator called in class');
  };
}

@ClassDecorator // decorator는 runtime에 호출된다 (즉, class instance를 생성하지 않아도 호출됨)
// 1. class
class PersonClass {
  // 2. property
  person: string = 'minsoo';

  constructor() {
    console.log('PersonClass instantiated');
  }

  // 3. accessor
  get getPseron() {
    return `My name is ${this.person}`;
  }

  // 4. method
  act(action: string) {
    console.log(`${this.person} is ${action}`);
  }
}

new PersonClass().act('coding');

// 정리하자면
// class decorator는 class instance를 생성하지 않아도 호출된다 -> class decorator initailized 출력
// class decorator는 생성자 함수를 받아서 메소드를 재정의 한다. -> decorator called in class 출력
