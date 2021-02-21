import { AbstractType, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';

export enum ObservablePropertyStrategy {
  Object,
  Observable,
  BehaviorSubject,
}

export function getAllFunctions(prototype: any, props?: (string | number | symbol)[]) {
  if (!props) {
    props = Reflect.ownKeys(prototype);
  }
  return props.filter((e) => typeof prototype[e] === 'function');
}

export function getAllProperties(prototype: any, props?: (string | number | symbol)[]) {
  if (!props) {
    props = Reflect.ownKeys(prototype);
  }
  return props.filter((e) => typeof prototype[e] !== 'function');
}

export function getDefaultObservableValue(strategy: ObservablePropertyStrategy) {
  switch (strategy) {
    case ObservablePropertyStrategy.Object:
      return {};
    case ObservablePropertyStrategy.Observable:
      return new Observable();
    case ObservablePropertyStrategy.BehaviorSubject:
      return new BehaviorSubject(null);
  }
}

export function addProperty(
  object: object,
  propertyName: string | number | symbol,
  valueToReturn: object
) {
  Object.defineProperty(object, propertyName, {
    get: () => valueToReturn,
    enumerable: true,
    configurable: true,
  });
}

export function autoSpyObj<T>(
  classUnderTest: NewableFunction,
  spyProperties = [] as string[],
  observableStrategy = ObservablePropertyStrategy.Observable
): jasmine.SpyObj<T> {
  const props = Reflect.ownKeys(classUnderTest.prototype);
  const spyObj: jasmine.SpyObj<T> = jasmine.createSpyObj(
    classUnderTest.name,
    getAllFunctions(classUnderTest.prototype, props)
  );

  const properties = getAllProperties(classUnderTest.prototype, props).concat(
    spyProperties
  );

  properties.map((name) => {
    let defaultValue = {};

    if (typeof name === 'string' && name.endsWith('$')) {
      defaultValue = getDefaultObservableValue(observableStrategy);
    }

    addProperty(spyObj, name, defaultValue);
  });

  return spyObj;
}

export function injectClass<T>(
  dependency: Type<T> | AbstractType<T>,
  testBed = TestBed
): T {
  return testBed.inject(dependency);
}

export function injectSpy<T>(
  dependency: Type<T> | AbstractType<T>,
  testBed = TestBed
): jasmine.SpyObj<T> {
  return injectClass(dependency, testBed) as jasmine.SpyObj<T>;
}
