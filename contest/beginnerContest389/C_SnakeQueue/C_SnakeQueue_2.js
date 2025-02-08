/**
 * @see https://atcoder.jp/contests/abc389/tasks/abc389_c
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const Q = Number(inputList[0]);

  /** @type {number[]} */
  const snakeLengthList = [];
  let totalLength = 0;
  let startIndex = 0;

  for (let i = 0; i < Q; i++) {
    const [operator, value] = inputList[i + 1].split(" ").map(Number);
    switch (operator) {
      case 1:
        snakeLengthList.push(totalLength);
        totalLength += value;
        break;
      case 2:
        startIndex += 1;
        break;
      case 3:
        const distance =
          snakeLengthList[startIndex + value - 1] - snakeLengthList[startIndex];
        console.log(distance);
        break;
    }
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
