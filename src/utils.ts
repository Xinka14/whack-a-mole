export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createArrayByRange(range: number, from: number = 0) {
  return Array.from({ length: range }, (_, index) => index + from);
}

export function getRandomElement<T>(arr: T[]): T | undefined {
  if (arr.length === 0) {
    return undefined;
  }
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

export function assertNotNull<T>(value: T): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error('Value must not be null or undefined');
  }
}
