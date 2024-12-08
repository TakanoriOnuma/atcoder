/**
 * @see https://atcoder.jp/contests/abc382/tasks/abc382_c
 */

const MAX = 2 * 10 ** 5;

/**
 * メイン実行
 * @param {string} input
 */
function Main(input) {
  const inputLines = input.split("\n");
  const [N, M] = inputLines[0].split(" ").map(Number);
  const rankPeople = inputLines[1].split(" ").map(Number);
  const rankSushiList = inputLines[2].split(" ").map(Number);

  /**
   * 対象のランクの寿司が何番目の人に選ばれるかのリスト
   * @type {number[]}
   */
  const eatenSushiRankList = Array(MAX).fill(-1);

  let rank = MAX;
  for (let i = 0; i < rankPeople.length; i++) {
    const rankPerson = rankPeople[i];
    while (rank >= rankPerson) {
      eatenSushiRankList[rank] = i + 1;
      rank--;
    }
  }

  // 回答
  rankSushiList.forEach((sushi) => {
    console.log(eatenSushiRankList[sushi]);
  });
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
