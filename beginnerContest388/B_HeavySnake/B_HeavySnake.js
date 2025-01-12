/**
 * @see https://atcoder.jp/contests/abc388/tasks/abc388_b
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, D] = inputList[0].split(" ").map(Number);

  const snakeParams = inputList.slice(1, N + 1).map((line) => {
    const [T, L] = line.split(" ").map(Number);
    return {
      thickness: T,
      length: L,
    };
  });

  // 回答
  for (let addLength = 1; addLength <= D; addLength++) {
    let maxWeight = 0;
    for (snakeParam of snakeParams) {
      const weight = snakeParam.thickness * (snakeParam.length + addLength);
      if (weight > maxWeight) {
        maxWeight = weight;
      }
    }
    console.log(maxWeight);
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
