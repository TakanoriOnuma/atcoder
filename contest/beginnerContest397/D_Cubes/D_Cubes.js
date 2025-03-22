// @ts-check
/**
 * @see https://atcoder.jp/contests/abc397/tasks/abc397_d
 */

/**
 * 2次方程式を解く
 * @param {BigInt} a
 * @param {BigInt} b
 * @param {BigInt} c
 */
const solveQuadraticEquation = (a, b, c) => {
  let l = 0n;
  let r = 600000001n; // なんでこの値？
  while (r - l > 1) {
    const mid = (l + r) / 2n;
    if (a * mid ** 2n + b * mid + c <= 0) {
      l = mid;
    } else {
      r = mid;
    }
  }

  if (a * l ** 2n + b * l + c === 0n) {
    return l;
  }
  return -1n;
};

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = BigInt(inputList[0]);

  for (let d = 1n; d ** 3n <= N; d++) {
    // 3*y^2 + 3*d*y + d^2 - N/d = 0を解く
    // N / d が整数でないと二次方程式の解も整数にならないためスキップ
    if (N % d !== 0n) {
      continue;
    }
    const m = N / d;
    const result = solveQuadraticEquation(3n, 3n * d, d ** 2n - m);
    if (result > 0n) {
      console.log(`${result + d} ${result}`);
      return;
    }
  }

  console.log(-1);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
