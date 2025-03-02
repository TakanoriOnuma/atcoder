/**
 * @see https://atcoder.jp/contests/abc395/tasks/abc395_a
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = Number(inputList[0]);
  const values = inputList[1].split(" ").map(Number);

  for (let i = 1; i < values.length; i++) {
    if (values[i - 1] >= values[i]) {
      console.log("No");
      return;
    }
  }

  console.log("Yes");
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
