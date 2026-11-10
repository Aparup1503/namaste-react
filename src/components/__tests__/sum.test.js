import { sum } from '../sum';
test('sum of 2 numbers', () => {
  //expect(sum(2, 3)).toBe(5);

  const result = sum(3, 4);

  //Assertion
  expect(result).toBe(7);
});
