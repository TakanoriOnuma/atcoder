// @ts-check
/**
 * @see https://atcoder.jp/contests/abc399/tasks/abc399_d
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const T = Number(inputList[0]);

  for (let i = 0; i < T; i++) {
    const N = Number(inputList[i * 2 + 1]);
    const A_List = inputList[i * 2 + 2].split(" ").map(Number);

    /**
     * 正しいペアになっている番号
     * @type {Record<number, boolean>}
     */
    const correctPairNumMap = {};
    /**
     * 存在しているペア
     * @type {Record<string, boolean>}
     */
    const pairMap = {};
    for (let j = 0; j < 2 * N - 1; j++) {
      // const [a, b] = [A_List[j], A_List[j + 1]].sort((a, b) => a - b);
      const [a, b] = [A_List[j], A_List[j + 1]];
      if (a === b) {
        correctPairNumMap[a] = true;
        continue;
      }
      if (a > b) {
        continue;
      }
      const pairKey = `${a},${b}`;
      pairMap[pairKey] = true;
    }

    let count = 0;
    for (const key in pairMap) {
      const [a, b] = key.split(",").map(Number);
      if (correctPairNumMap[a] || correctPairNumMap[b]) {
        continue;
      }
      count += 1;
    }
    // 回答
    console.log(count);
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
