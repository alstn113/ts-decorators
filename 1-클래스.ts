// 클래스 데코레이터
function classDecorator(target: Function) {
  console.log('Class decorator executed');
  console.log('Target:', target); // 클래스 생성자 함수
}

@classDecorator // decorator는 runtime에 호출된다 (즉, class instance를 생성하지 않아도 호출됨)
class ExampleClass {
  constructor() {
    console.log('ExampleClass instantiated');
  }
}

// 실행 결과
// Class decorator executed
// Target: [Function: ExampleClass]

// 만약 new ExampleClass()를 통해 클래스 인스턴스를 생성하면 아래와 같이 출력된다.

// 실행 결과
// Class decorator executed
// Target: [Function: ExampleClass]
// ExampleClass instantiated
