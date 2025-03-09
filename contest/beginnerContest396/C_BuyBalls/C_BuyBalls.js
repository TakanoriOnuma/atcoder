// @ts-check
/**
 * @see https://atcoder.jp/contests/abc396/tasks/abc396_c
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, M] = inputList[0].split(" ").map(Number);
  const bBalls = inputList[1].split(" ").map(Number);
  const wBalls = inputList[2].split(" ").map(Number);

  bBalls.sort((a, b) => b - a);
  wBalls.sort((a, b) => b - a);

  let sum = 0;
  for (let i = 0; i < N; i++) {
    const black = bBalls[i];
    const white = wBalls[i] ?? 0;
    if (white > 0) {
      const pair = black + white;
      if (pair > 0) {
        sum += pair;
      } else {
        break;
      }
    } else {
      if (black > 0) {
        sum += black;
      } else {
        break;
      }
    }
  }

  // 回答
  console.log(sum);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
