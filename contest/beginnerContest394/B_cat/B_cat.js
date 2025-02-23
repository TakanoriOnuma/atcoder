/**
 * @see https://atcoder.jp/contests/abc394/tasks/abc394_b
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = Number(inputList[0]);
  const strList = inputList.slice(1, N + 1);

  strList.sort((aStr, bStr) => aStr.length - bStr.length);

  // 回答
  console.log(strList.join(""));
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
