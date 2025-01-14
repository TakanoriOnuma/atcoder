/**
 * @see https://atcoder.jp/contests/abc388/tasks/abc388_e
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = Number(inputList[0]);
  const mochiList = inputList[1].split(" ").map(Number);

  /** ペアの数 */
  let count = 0;
  let checkIndex = Math.ceil(N / 2);
  while (checkIndex < N) {
    const value = mochiList[count];
    while (checkIndex < N && mochiList[checkIndex] < value * 2) {
      checkIndex += 1;
    }
    if (checkIndex >= N) {
      break;
    }
    count += 1;
    checkIndex += 1;
  }

  // 回答
  console.log(count);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
