/**
 * @see https://atcoder.jp/contests/abc389/tasks/abc389_a
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [A, B] = inputList[0].split("x").map(Number);

  // 回答
  console.log(A * B);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
