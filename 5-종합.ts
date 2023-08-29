import 'reflect-metadata';

// 클래스 데코레이터: 클래스에 대한 정보를 저장
function classInfo(info: string) {
  return function (target: any) {
    Reflect.defineMetadata('classInfo', info, target);
  };
}

// 메서드 데코레이터: 메서드 설명 정보를 저장
function methodInfo(info: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    Reflect.defineMetadata('methodInfo', info, target, propertyKey);
  };
}

// 매개변수 데코레이터: 파라미터에 대한 정보를 저장
function parameterInfo(info: string) {
  return function (target: any, methodName: string, parameterIndex: number) {
    const existingMetadata =
      Reflect.getMetadata('parameterInfo', target, methodName) || {};
    existingMetadata[parameterIndex] = info;
    Reflect.defineMetadata(
      'parameterInfo',
      existingMetadata,
      target,
      methodName
    );
  };
}

@classInfo('This is a class for handling tasks.')
class TaskManager {
  @methodInfo('This method adds a task.')
  addTask(@parameterInfo('Task description') description: string) {
    console.log(`Adding task: ${description}`);
    // Simulate delay
    for (let i = 0; i < 1000000000; i++) {}
    console.log(`Task added.`);
  }
}

// 클래스 메타데이터 출력
const classInfoValue = Reflect.getMetadata('classInfo', TaskManager);
console.log('Class info:', classInfoValue);

// 메서드 메타데이터와 상호작용
const addTaskMethodInfo = Reflect.getMetadata(
  'methodInfo',
  TaskManager.prototype,
  'addTask'
);
console.log('Add Task method info:', addTaskMethodInfo);

// 매개변수 메타데이터와 상호작용
const addTaskParameterInfo = Reflect.getMetadata(
  'parameterInfo',
  TaskManager.prototype,
  'addTask'
);
console.log('Add Task parameter info:', addTaskParameterInfo[0]);

console.log('----- 실행결과 -----');

// 메타데이터를 활용하여 작업 수행
if (addTaskMethodInfo === 'This method adds a task.') {
  const taskManager = new TaskManager();
  taskManager.addTask('Complete project');
}
