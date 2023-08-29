// 첫 번째 argument: class의 prototype
// 두 번째 argument: class에서 해당 method의 key
// 세 번째 argument: property descriptor
function LogError(target: any, key: string, desc: PropertyDescriptor): void {
  // console.log(target);
  // console.log(key);
  // console.log(desc);

  const method = desc.value; // 기존의 method

  // 기존의 method가 error를 던졋을 때 error handling 할 수 있도록 재정의
  desc.value = function () {
    try {
      method();
    } catch (err) {
      console.log('여기에 error handling logic 추가');
    }
  };
}

function LogErrorMessage(message: string) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value; // 기존의 method

    // 기존의 method가 error를 던졋을 때 error handling 할 수 있도록 재정의
    desc.value = function () {
      try {
        method();
      } catch (err) {
        console.log(message);
      }
    };
  };
}

// 1. class
class Person2Class {
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
  @LogError
  act(action: string) {
    console.log(`${this.person} is ${action}`);
    throw new Error();
  }

  @LogErrorMessage('error message')
  act2(action: string) {
    console.log(`${this.person} is ${action}`);
    throw new Error();
  }
}

const a = new Person2Class();
a.act('coding');
a.act2('coding');
