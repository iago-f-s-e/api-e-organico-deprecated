export const isValidEmail = (value: string, maxSize: number): boolean => {
  if (value.length > maxSize) return false;

  const tester = /^([a-z0-9]+[.|-|_]?)*[a-z0-9]\@[a-z0-9]+(\.[a-z]+)+$/;

  return tester.test(value);
};
