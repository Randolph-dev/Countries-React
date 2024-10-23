import { sum } from "../utils/functions";

test("sum function should return the sum of two numbers", () => {
  expect(sum(1, 2)).toBe(3);
});