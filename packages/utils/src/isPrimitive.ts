export function isPrimitive(test: any) {
  return test !== Object(test);
}
