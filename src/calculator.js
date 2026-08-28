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
 * Usage:
 *   node calculator.js <number1> <operator> <number2>
 *
 * Examples:
 *   node calculator.js 5 + 3   -> 8
 *   node calculator.js 10 / 2  -> 5
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
      `Unsupported operator "${operator}". Supported operators: + - * /`
    );
  }
  return operation(a, b);
}

/**
 * Runs the CLI: parses arguments, performs the calculation, and prints the result.
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length !== 3) {
    console.error("Usage: node calculator.js <number1> <operator> <number2>");
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

module.exports = { add, subtract, multiply, divide, calculate };
