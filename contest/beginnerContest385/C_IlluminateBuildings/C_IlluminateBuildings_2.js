/**
 * @see https://atcoder.jp/contests/abc385/tasks/abc385_c
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = Number(inputList[0]);
  const heightList = inputList[1].split(" ").map(Number);

  /**
   * 指定の間隔で均等に並べられる最大のビル数を計算する
   * @param {number} distance - 間隔
   * @see https://atcoder.jp/contests/abc385/editorial/11655
   */
  const calcMaxEvenlyBuildings = (distance) => {
    let numMax = 0;
    for (let start = 0; start < distance; start++) {
      let count = 0;
      let height = 0;
      for (let i = start; i < heightList.length; i += distance) {
        if (heightList[i] === height) {
          count += 1;
        } else {
          height = heightList[i];
          count = 1;
        }
        numMax = Math.max(numMax, count);
      }
    }
    return numMax;
  };

  // 最小でも1なので1からスタート（N=1の場合forループが実行されないため）
  let maxEvenlyBuildings = 1;
  for (let distance = 1; distance < heightList.length; distance++) {
    const num = calcMaxEvenlyBuildings(distance);
    maxEvenlyBuildings = Math.max(maxEvenlyBuildings, num);
  }

  // 回答
  console.log(maxEvenlyBuildings);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
