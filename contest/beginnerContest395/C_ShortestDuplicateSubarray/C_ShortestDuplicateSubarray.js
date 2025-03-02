/**
 * @see https://atcoder.jp/contests/abc395/tasks/abc395_c
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = Number(inputList[0]);
  const values = inputList[1].split(" ").map(Number);

  /**
   * 各数値が何番目に出現するかのマップ
   * @type {Record<number, number[]>}
   */
  const indexesMap = {};

  for (let i = 0; i < N; i++) {
    const value = values[i];
    if (indexesMap[value] == null) {
      indexesMap[value] = [];
    }
    indexesMap[value].push(i);
  }

  let result = Number.MAX_SAFE_INTEGER;
  Object.entries(indexesMap).forEach(([value, indexes]) => {
    for (let i = 1; i < indexes.length; i++) {
      const diff = indexes[i] - indexes[i - 1];
      result = Math.min(result, diff + 1);
    }
  });

  // 回答
  console.log(result === Number.MAX_SAFE_INTEGER ? -1 : result);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
