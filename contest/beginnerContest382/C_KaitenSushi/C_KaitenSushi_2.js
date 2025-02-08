/**
 * @see https://atcoder.jp/contests/abc382/tasks/abc382_c
 */

/**
 * メイン実行
 * @param {string} input
 */
function Main(input) {
  const inputLines = input.split("\n");
  const [N, M] = inputLines[0].split(" ").map(Number);
  const rankPeople = inputLines[1].split(" ").map(Number);
  const rankSushiObjList = inputLines[2].split(" ").map((v) => ({
    value: Number(v),
  }));

  /**
   * 対象の寿司が何番目の人に選ばれたかを保持するMap
   * @type {Map<{ value: number }, number>}
   */
  const eatenSushiMap = new Map();

  let restRankSushiObjList = [...rankSushiObjList];
  for (let pi = 0; pi < rankPeople.length; pi++) {
    const rankPerson = rankPeople[pi];
    const nextRestRankSushiObjList = [];
    for (const sushiObj of restRankSushiObjList) {
      if (rankPerson <= sushiObj.value) {
        eatenSushiMap.set(sushiObj, pi + 1);
      } else {
        nextRestRankSushiObjList.push(sushiObj);
      }
    }

    restRankSushiObjList = nextRestRankSushiObjList;
    if (restRankSushiObjList.length <= 0) {
      break;
    }
  }
  // 誰にも選ばれなかった寿司を-1に設定
  restRankSushiObjList.forEach((sushiObj) => {
    eatenSushiMap.set(sushiObj, -1);
  });

  // 回答
  rankSushiObjList.forEach((sushiObj) => {
    console.log(eatenSushiMap.get(sushiObj));
  });
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
