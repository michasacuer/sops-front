import 'reflect-metadata';

const editableMetadataKey = Symbol('editable');
const displayNameMetadataKey = Symbol('displayName');
const passwordMetadataKey = Symbol('password');

export function editable(target: any, propertyKey: string) {
  const properties: string[] = Reflect.getMetadata(editableMetadataKey, target) || [];
  if (properties.indexOf(propertyKey) < 0) {
    properties.push(propertyKey);
  }

  Reflect.defineMetadata(editableMetadataKey, properties, target);
}

export function getEditables(target: any) {
  return Reflect.getMetadata(editableMetadataKey, target) || [];
}

export function displayName(name: string) {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata(displayNameMetadataKey, name, target, propertyKey);
  };
}

export function getDisplayName(target: any, propertyKey: string) {
  return Reflect.getMetadata(displayNameMetadataKey, target, propertyKey) || propertyKey;
}

export function password(target: any, propertyKey: string) {
  Reflect.defineMetadata(passwordMetadataKey, true, target, propertyKey);
}

export function isPassword(target: any, propertyKey: string) {
  return Reflect.getMetadata(passwordMetadataKey, target, propertyKey) || false;
}
