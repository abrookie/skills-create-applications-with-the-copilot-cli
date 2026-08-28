/**
 * Unit tests for the CLI calculator functions (add, subtract, multiply, divide,
 * modulo, power, squareRoot).
 *
 * Includes examples from images/calc-basic-operations.png:
 *   2 + 3, 10 - 4, 45 * 2, 20 / 5
 * and images/calc-extended-operations.png:
 *   5 % 2, 2 ^ 3, sqrt(16)
 * plus additional cases (negatives, decimals, zero, division-by-zero, edge cases).
 */

const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
} = require("../calculator");

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

describe("modulo", () => {
  test("5 % 2 = 1 (image example)", () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test("returns remainder of two positive numbers", () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test("returns zero when evenly divisible", () => {
    expect(modulo(9, 3)).toBe(0);
  });

  test("handles negative dividend", () => {
    expect(modulo(-10, 3)).toBe(-1);
  });

  test("handles negative divisor", () => {
    expect(modulo(10, -3)).toBe(1);
  });

  test("handles decimal numbers", () => {
    expect(modulo(5.5, 2)).toBeCloseTo(1.5);
  });

  test("throws an error when modulo by zero", () => {
    expect(() => modulo(10, 0)).toThrow("Modulo by zero is not allowed.");
  });
});

describe("power", () => {
  test("2 ^ 3 = 8 (image example)", () => {
    expect(power(2, 3)).toBe(8);
  });

  test("raises a number to a positive exponent", () => {
    expect(power(3, 4)).toBe(81);
  });

  test("raises a number to the power of zero", () => {
    expect(power(5, 0)).toBe(1);
  });

  test("raises a number to a negative exponent", () => {
    expect(power(2, -2)).toBeCloseTo(0.25);
  });

  test("raises a negative base to an even exponent", () => {
    expect(power(-2, 2)).toBe(4);
  });

  test("raises a negative base to an odd exponent", () => {
    expect(power(-2, 3)).toBe(-8);
  });

  test("handles decimal bases and exponents", () => {
    expect(power(2.5, 2)).toBeCloseTo(6.25);
  });
});

describe("squareRoot", () => {
  test("sqrt(16) = 4 (image example)", () => {
    expect(squareRoot(16)).toBe(4);
  });

  test("returns square root of a perfect square", () => {
    expect(squareRoot(25)).toBe(5);
  });

  test("returns square root of a non-perfect square", () => {
    expect(squareRoot(2)).toBeCloseTo(1.41421356);
  });

  test("returns zero for the square root of zero", () => {
    expect(squareRoot(0)).toBe(0);
  });

  test("returns a decimal result for a decimal input", () => {
    expect(squareRoot(2.25)).toBeCloseTo(1.5);
  });

  test("throws an error for negative numbers (edge case)", () => {
    expect(() => squareRoot(-1)).toThrow(
      "Cannot compute the square root of a negative number."
    );
  });

  test("throws an error for a large negative number (edge case)", () => {
    expect(() => squareRoot(-100)).toThrow(
      "Cannot compute the square root of a negative number."
    );
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

  test("supports % operator (image example: 5 % 2 = 1)", () => {
    expect(calculate(5, "%", 2)).toBe(1);
  });

  test("supports ^ operator (image example: 2 ^ 3 = 8)", () => {
    expect(calculate(2, "^", 3)).toBe(8);
  });

  test("supports word aliases (add, subtract, multiply, divide, modulo, power)", () => {
    expect(calculate(2, "add", 3)).toBe(5);
    expect(calculate(10, "subtract", 4)).toBe(6);
    expect(calculate(45, "multiply", 2)).toBe(90);
    expect(calculate(20, "divide", 5)).toBe(4);
    expect(calculate(5, "modulo", 2)).toBe(1);
    expect(calculate(2, "power", 3)).toBe(8);
    expect(calculate(2, "exponentiation", 3)).toBe(8);
  });

  test("throws an error for an unsupported operator", () => {
    expect(() => calculate(1, "?", 2)).toThrow(/Unsupported operator/);
  });

  test("throws an error for division by zero via calculate", () => {
    expect(() => calculate(5, "/", 0)).toThrow("Division by zero is not allowed.");
  });

  test("throws an error for modulo by zero via calculate", () => {
    expect(() => calculate(5, "%", 0)).toThrow("Modulo by zero is not allowed.");
  });
});
