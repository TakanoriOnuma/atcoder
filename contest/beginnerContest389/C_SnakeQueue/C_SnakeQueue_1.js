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

  /** @type{number[]} */
  const queue = [];
  let queueIndex = 0;
  let total = 0;

  for (let i = 0; i < Q; i++) {
    const [operator, value] = inputList[i + 1].split(" ").map(Number);
    switch (operator) {
      case 1:
        total += value;
        queue.push(value);
        break;
      case 2:
        total -= queue[queueIndex];
        queueIndex += 1;
        break;
      case 3:
        {
          const length = queue.length - queueIndex;
          if (value < length / 2) {
            // 頭から数える
            let result = 0;
            for (let j = queueIndex; j < queueIndex + value - 1; j++) {
              result += queue[j];
            }
            // const result = queue
            //   .slice(queueIndex, queueIndex + value - 1)
            //   .reduce((prev, current) => prev + current, 0);
            console.log(result);
          } else {
            // 末尾から数えて、全体から引く
            let result = 0;
            for (let j = queueIndex + value - 1; j < queue.length; j++) {
              result += queue[j];
            }
            // const result = queue
            //   .slice(queueIndex + value - 1)
            //   .reduce((prev, current) => prev + current, 0);
            console.log(total - result);
          }
        }
        break;
    }
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
