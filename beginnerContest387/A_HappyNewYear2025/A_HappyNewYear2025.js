/**
 * @see https://atcoder.jp/contests/abc387/tasks/abc387_a
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [A, B] = inputList[0].split(" ").map(Number);

  // 回答
  console.log((A + B) ** 2);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
