// @ts-check
/**
 * @see https://atcoder.jp/contests/abc402/tasks/abc402_b
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const Q = Number(inputList[0]);

  /**
   * @typedef {number[]}
   */
  const queue = [];
  let queueIndex = 0;

  for (let i = 0; i < Q; i++) {
    const [type, x] = inputList[i + 1].split(" ").map(Number);
    switch (type) {
      case 1:
        queue.push(x);
        break;
      case 2:
        console.log(queue[queueIndex]);
        queueIndex += 1;
        break;
    }
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
