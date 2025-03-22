// @ts-check
/**
 * @see https://atcoder.jp/contests/abc397/tasks/abc397_d
 */

/**
 * 2次方程式を解く
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
const solveQuadraticEquation = (a, b, c) => {
  let l = 0;
  let r = 600000001; // なんでこの値？
  while (r - l > 1) {
    const mid = Math.floor((l + r) / 2);
    if (a * mid ** 2 + b * mid + c <= 0) {
      l = mid;
    } else {
      r = mid;
    }
  }

  if (a * l ** 2 + b * l + c === 0) {
    return l;
  }
  return -1;
};

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = Number(inputList[0]);

  for (let d = 1; d ** 3 <= N; d++) {
    // 3*y^2 + 3*d*y + d^2 - N/d = 0
    const m = N / d;
    // N / d が整数でないと二次方程式の解も整数にならないためスキップ
    if (!Number.isInteger(m)) {
      continue;
    }
    const result = solveQuadraticEquation(3, 3 * d, d ** 2 - m);
    if (result > 0) {
      console.log(`${result + d} ${result}`);
      return;
    }
  }

  console.log(-1);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
