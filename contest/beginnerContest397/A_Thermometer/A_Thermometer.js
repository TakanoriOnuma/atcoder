// @ts-check
/**
 * @see https://atcoder.jp/contests/abc397/tasks/abc397_a
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const X = Number(inputList[0]);

  // 回答
  if (X >= 38.0) {
    console.log(1);
  } else if (X >= 37.5) {
    console.log(2);
  } else {
    console.log(3);
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
