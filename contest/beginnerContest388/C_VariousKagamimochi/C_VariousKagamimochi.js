/**
 * @see https://atcoder.jp/contests/abc388/tasks/abc388_c
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = Number(inputList[0]);
  const mochiList = inputList[1].split(" ").map(Number);

  let total = 0;
  let checkIndex = 1;
  for (let i = 0; i < mochiList.length; i++) {
    const value = mochiList[i];
    while (checkIndex < mochiList.length && mochiList[checkIndex] < value * 2) {
      checkIndex += 1;
    }
    const count = mochiList.length - checkIndex;
    if (count === 0) {
      break;
    }
    total += count;
  }

  // 回答
  console.log(total);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
