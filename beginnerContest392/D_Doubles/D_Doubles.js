/**
 * @see https://atcoder.jp/contests/abc392/tasks/abc392_d
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N] = inputList[0].split(" ").map(Number);

  const countMapList = Array.from({ length: N }, (_, i) => {
    const values = inputList[i + 1].split(" ").map(Number);
    /** @type {Record<string, number>} */
    const countMap = {};
    const total = values[0];
    for (let i = 0; i < total; i++) {
      const A = values[i + 1];
      countMap[A] = (countMap[A] || 0) + 1;
    }
    return {
      total,
      countMap,
    };
  });

  let maxRate = 0;
  for (let i = 0; i < N - 1; i++) {
    const values = Object.keys(countMapList[i].countMap);
    for (let j = i + 1; j < N; j++) {
      const countCases = values.reduce((acc, value) => {
        return (
          acc +
          (countMapList[i].countMap[value] || 0) *
            (countMapList[j].countMap[value] || 0)
        );
      }, 0);

      const rate = countCases / (countMapList[i].total * countMapList[j].total);
      maxRate = Math.max(maxRate, rate);
    }
  }

  // 回答
  console.log(maxRate);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
