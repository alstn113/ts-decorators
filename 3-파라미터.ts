// 매개변수 데코레이터
// 첫번째 argument: target의 prototype
// 두번째 argument: method의 key
// 세번째 argument: parameter의 index
function parameterDecorator(target: any, key: string, index: number) {
  console.log(target);
  console.log(key);
  console.log(index);
}

class ExampleClass {
  greet(@parameterDecorator name: string) {
    console.log(`Hello, ${name}!`);
  }
}

const example = new ExampleClass();
example.greet('Alice');

// 프로퍼티 데코레이터나 접근 제한자 데코레이터도 마찬가지로 사용할 수 있다.
