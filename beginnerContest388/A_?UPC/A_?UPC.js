/**
 * @see https://atcoder.jp/contests/abc388/tasks/abc388_a
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const firstStr = inputList[0].charAt(0);

  // 回答
  console.log(firstStr + "UPC");
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
