// @ts-check
/**
 * @see https://atcoder.jp/contests/abc399/tasks/abc399_b
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = Number(inputList[0]);
  const P_List = inputList[1].split(" ").map(Number);

  /**
   * 各得点ごとの順位と人のインデックスマッピング
   * @type {Record<number, { rank: number; personIndexes: number[] }>}
   */
  const rankMap = {};
  P_List.forEach((P, index) => {
    if (rankMap[P] == null) {
      rankMap[P] = { rank: -1, personIndexes: [] };
    }
    rankMap[P].personIndexes.push(index);
  });

  const points = Object.keys(rankMap).map(Number);
  points.sort((a, b) => b - a);
  let rank = 1;
  points.forEach((point) => {
    const personIndexes = rankMap[point].personIndexes;
    rankMap[point].rank = rank;
    rank += personIndexes.length;
  });

  // 回答
  P_List.forEach((P) => {
    console.log(rankMap[P].rank);
  });
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
