/**
 * @see https://atcoder.jp/contests/abc392/tasks/abc392_a
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [A1, A2, A3] = inputList[0].split(" ").map(Number);

  if (A1 * A2 === A3) {
    console.log("Yes");
  } else if (A1 * A3 === A2) {
    console.log("Yes");
  } else if (A2 * A3 === A1) {
    console.log("Yes");
  } else {
    console.log("No");
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
