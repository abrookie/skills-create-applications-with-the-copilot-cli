/**
 * Unit tests for the CLI calculator functions (add, subtract, multiply, divide).
 *
 * Includes examples from images/calc-basic-operations.png:
 *   2 + 3, 10 - 4, 45 * 2, 20 / 5
 * plus additional cases (negatives, decimals, zero, division-by-zero).
 */

const { add, subtract, multiply, divide, calculate } = require("../calculator");

describe("add", () => {
  test("2 + 3 = 5 (image example)", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("adds two positive numbers", () => {
    expect(add(10, 20)).toBe(30);
  });

  test("adds negative numbers", () => {
    expect(add(-5, -7)).toBe(-12);
  });

  test("adds a positive and a negative number", () => {
    expect(add(5, -8)).toBe(-3);
  });

  test("adds decimal numbers", () => {
    expect(add(1.5, 2.25)).toBeCloseTo(3.75);
  });

  test("adds zero", () => {
    expect(add(0, 0)).toBe(0);
  });
});

describe("subtract", () => {
  test("10 - 4 = 6 (image example)", () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test("subtracts resulting in a negative number", () => {
    expect(subtract(4, 10)).toBe(-6);
  });

  test("subtracts negative numbers", () => {
    expect(subtract(-5, -3)).toBe(-2);
  });

  test("subtracts decimal numbers", () => {
    expect(subtract(5.5, 2.2)).toBeCloseTo(3.3);
  });

  test("subtracts zero", () => {
    expect(subtract(7, 0)).toBe(7);
  });
});

describe("multiply", () => {
  test("45 * 2 = 90 (image example)", () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test("multiplies two positive numbers", () => {
    expect(multiply(6, 7)).toBe(42);
  });

  test("multiplies by zero", () => {
    expect(multiply(100, 0)).toBe(0);
  });

  test("multiplies negative numbers", () => {
    expect(multiply(-3, 4)).toBe(-12);
    expect(multiply(-3, -4)).toBe(12);
  });

  test("multiplies decimal numbers", () => {
    expect(multiply(1.5, 2)).toBeCloseTo(3);
  });
});

describe("divide", () => {
  test("20 / 5 = 4 (image example)", () => {
    expect(divide(20, 5)).toBe(4);
  });

  test("divides two positive numbers", () => {
    expect(divide(10, 2)).toBe(5);
  });

  test("divides resulting in a decimal", () => {
    expect(divide(7, 2)).toBe(3.5);
  });

  test("divides negative numbers", () => {
    expect(divide(-10, 5)).toBe(-2);
    expect(divide(-10, -5)).toBe(2);
  });

  test("dividing zero by a number returns zero", () => {
    expect(divide(0, 5)).toBe(0);
  });

  test("throws an error when dividing by zero", () => {
    expect(() => divide(10, 0)).toThrow("Division by zero is not allowed.");
  });
});

describe("calculate", () => {
  test("supports + operator", () => {
    expect(calculate(2, "+", 3)).toBe(5);
  });

  test("supports - operator", () => {
    expect(calculate(10, "-", 4)).toBe(6);
  });

  test("supports * operator", () => {
    expect(calculate(45, "*", 2)).toBe(90);
  });

  test("supports / operator", () => {
    expect(calculate(20, "/", 5)).toBe(4);
  });

  test("supports word aliases (add, subtract, multiply, divide)", () => {
    expect(calculate(2, "add", 3)).toBe(5);
    expect(calculate(10, "subtract", 4)).toBe(6);
    expect(calculate(45, "multiply", 2)).toBe(90);
    expect(calculate(20, "divide", 5)).toBe(4);
  });

  test("throws an error for an unsupported operator", () => {
    expect(() => calculate(1, "%", 2)).toThrow(/Unsupported operator/);
  });

  test("throws an error for division by zero via calculate", () => {
    expect(() => calculate(5, "/", 0)).toThrow("Division by zero is not allowed.");
  });
});
