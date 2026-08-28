#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 *
 * Supports the four basic math operations:
 *   +  Addition        (add)
 *   -  Subtraction     (subtract)
 *   *  Multiplication  (multiply)
 *   /  Division        (divide)
 *
 * Plus:
 *   %    Modulo         (modulo)
 *   ^    Exponentiation (power)
 *   sqrt Square root    (squareRoot) - unary
 *
 * Usage:
 *   node calculator.js <number1> <operator> <number2>
 *   node calculator.js sqrt <number>
 *
 * Examples:
 *   node calculator.js 5 + 3    -> 8
 *   node calculator.js 10 / 2   -> 5
 *   node calculator.js 10 % 3   -> 1
 *   node calculator.js 2 ^ 8    -> 256
 *   node calculator.js sqrt 16  -> 4
 */

/**
 * Adds two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number} sum of a and b
 */
function add(a, b) {
  return a + b;
}

/**
 * Subtracts the second number from the first.
 * @param {number} a
 * @param {number} b
 * @returns {number} difference of a and b
 */
function subtract(a, b) {
  return a - b;
}

/**
 * Multiplies two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number} product of a and b
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Divides the first number by the second.
 * @param {number} a
 * @param {number} b
 * @returns {number} quotient of a and b
 * @throws {Error} if b is zero
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  return a / b;
}

/**
 * Returns the remainder of a divided by b.
 * @param {number} a
 * @param {number} b
 * @returns {number} remainder of a divided by b
 * @throws {Error} if b is zero
 */
function modulo(a, b) {
  if (b === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }
  return a % b;
}

/**
 * Raises a base number to the given exponent.
 * @param {number} base
 * @param {number} exponent
 * @returns {number} base raised to the exponent
 */
function power(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * Computes the square root of a number.
 * @param {number} n
 * @returns {number} square root of n
 * @throws {Error} if n is negative
 */
function squareRoot(n) {
  if (n < 0) {
    throw new Error("Cannot compute the square root of a negative number.");
  }
  return Math.sqrt(n);
}

// Maps supported operator symbols/aliases to their corresponding function.
const OPERATIONS = {
  "+": add,
  add: add,
  "-": subtract,
  subtract: subtract,
  "*": multiply,
  x: multiply,
  multiply: multiply,
  "/": divide,
  divide: divide,
  "%": modulo,
  modulo: modulo,
  "^": power,
  power: power,
  exponentiation: power,
};

/**
 * Performs a calculation given two numbers and an operator.
 * @param {number} a - first operand
 * @param {string} operator - one of +, -, *, / (or add/subtract/multiply/divide)
 * @param {number} b - second operand
 * @returns {number} result of the operation
 */
function calculate(a, operator, b) {
  const operation = OPERATIONS[operator];
  if (!operation) {
    throw new Error(
      `Unsupported operator "${operator}". Supported operators: + - * / % ^ sqrt`
    );
  }
  return operation(a, b);
}

/**
 * Runs the CLI: parses arguments, performs the calculation, and prints the result.
 */
function main() {
  const args = process.argv.slice(2);

  // sqrt is unary: node calculator.js sqrt <number>
  if (args.length === 2 && args[0].toLowerCase() === "sqrt") {
    const n = Number(args[1]);
    if (Number.isNaN(n)) {
      console.error("Operand must be a valid number.");
      process.exitCode = 1;
      return;
    }
    try {
      console.log(squareRoot(n));
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
    return;
  }

  if (args.length !== 3) {
    console.error("Usage: node calculator.js <number1> <operator> <number2>");
    console.error("       node calculator.js sqrt <number>");
    console.error("Example: node calculator.js 5 + 3");
    process.exitCode = 1;
    return;
  }

  const [rawA, operator, rawB] = args;
  const a = Number(rawA);
  const b = Number(rawB);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error("Both operands must be valid numbers.");
    process.exitCode = 1;
    return;
  }

  try {
    const result = calculate(a, operator, b);
    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
};
