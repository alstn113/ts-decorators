// 메타데이터는 데코레이터를 사용하여 클래스, 메서드, 프로퍼티, 매개변수 등에 추가되는 정보를 의미합니다.
// 이 정보는 런타임 중에 접근할 수 있어서 유용한 정보나 구성 설정을 저장하거나 전달하는 데 사용됩니다.

// pnpm add reflect-metadata

// 특정 타입에 대한 metadata를 내보낼 수 있기 위해 tsconfig.json에 설정을 추가해야 한다.
// "emitDecoratorMetadata": true

import 'reflect-metadata'; // 'Reflect'라는 global object를 생성한다.

const employee = {
  firstName: 'Alice',
};

// 'employee'에 `position: 'Manager'`라는 metadata property를 추가한다.
Reflect.defineMetadata('position', 'Manager', employee);
console.log(employee);

// 'employee.firstName'에 `lastName: 'Johnson'`이라는 metadata property를 추가한다.
Reflect.defineMetadata('lastName', 'Johnson', employee, 'firstName');
console.log(employee);

// 'employee'에서 'position'을 key로 가지는 metadata value를 가져온다.
const jobPosition = Reflect.getMetadata('position', employee);
console.log(jobPosition);

// 'employee.firstName'에서 'lastName'을 key로 가지는 metadata value를 가져온다.
const lastName = Reflect.getMetadata('lastName', employee, 'firstName');
console.log(lastName);

// --------------
// 다음은 사용법입니다.
// --------------

// 메서드 데코레이터를 사용하여 메타데이터 추가
function logExecutionTime(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const startTime = new Date();
    const result = originalMethod.apply(this, args);
    const endTime = new Date();
    const executionTime = endTime.getTime() - startTime.getTime();

    // 메서드 이름과 실행 시간을 메타데이터로 저장
    Reflect.defineMetadata('executionTime', executionTime, target, propertyKey);

    return result;
  };

  return descriptor;
}

class ExampleClass {
  @logExecutionTime
  slowOperation() {
    for (let i = 0; i < 1000000000; i++) {
      // Some time-consuming operation
    }
  }
}

const example = new ExampleClass();
example.slowOperation();

// 메타데이터를 사용하여 실행 시간 정보 출력
const executionTime = Reflect.getMetadata(
  'executionTime',
  example,
  'slowOperation'
);
console.log(`Execution time: ${executionTime}ms`);
