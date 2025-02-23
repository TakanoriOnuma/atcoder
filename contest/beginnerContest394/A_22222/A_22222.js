/**
 * @see https://atcoder.jp/contests/abc394/tasks/abc394_a
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const S = inputList[0];

  const result = S.replaceAll(/[^2]/g, "");

  // 回答
  console.log(result);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
