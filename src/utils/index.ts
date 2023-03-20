export function ensure<T>(value: T) {
  if (value == undefined) {
    throw new Error('value must be defined');
  }

  return value;
}
