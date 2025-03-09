// @ts-check
/**
 * @see https://atcoder.jp/contests/abc396/tasks/abc396_a
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = Number(inputList[0]);
  const numList = inputList[1].split(" ").map(Number);

  for (let i = 0; i < N - 2; i++) {
    if (numList[i] === numList[i + 1] && numList[i + 1] === numList[i + 2]) {
      console.log("Yes");
      return;
    }
  }

  console.log("No");
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
