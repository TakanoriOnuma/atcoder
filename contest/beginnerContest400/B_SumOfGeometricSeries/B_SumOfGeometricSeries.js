// @ts-check
/**
 * @see https://atcoder.jp/contests/abc400/tasks/abc400_b
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, M] = inputList[0].split(" ").map(Number);

  const MAX = 10 ** 9;
  let total = 0;
  let val = 1;
  for (let i = 0; i <= M; i++) {
    total += val;
    if (total > MAX) {
      console.log("inf");
      return;
    }
    val *= N;
  }

  // 回答
  console.log(total);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
