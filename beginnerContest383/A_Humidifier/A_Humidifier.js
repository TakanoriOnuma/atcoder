/**
 * @see https://atcoder.jp/contests/abc383/tasks/abc383_a
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = Number(inputList[0]);

  let liter = 0;
  let time = 0;
  for (let i = 0; i < N; i++) {
    const [T, V] = inputList[i + 1].split(" ").map(Number);
    liter = Math.max(liter - (T - time), 0);
    time = T;
    liter += V;
  }

  // 回答
  console.log(liter);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
