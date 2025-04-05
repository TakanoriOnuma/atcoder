// @ts-check
/**
 * @see https://atcoder.jp/contests/abc400/tasks/abc400_a
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const A = Number(inputList[0]);

  const result = 400 / A;

  // 回答
  console.log(Number.isInteger(result) ? result : -1);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
