/**
 * @see https://atcoder.jp/contests/abc385/tasks/abc385_c
 */

/**
 * 均等に並べられる最大のビル数を計算する
 * @param {number[]} indexes
 */
const calcMaxEvenlyBuildings = (indexes) => {
  const pairsQueue = [indexes];

  const checkEvenly = (pairs) => {
    if (pairs.length < 2) {
      // 1以下の場合は比較対象がないためtrue
      return true;
    }
    const distance = pairs[1] - pairs[0];
    for (let i = 2; i < pairs.length; i++) {
      if (pairs[i] - pairs[i - 1] !== distance) {
        return false;
      }
    }
    return true;
  };

  for (let pointer = 0; pointer < pairsQueue.length; pointer++) {
    const pairs = pairsQueue[pointer];
    if (checkEvenly(pairs)) {
      return pairs.length;
    }
    for (let i = 0; i < pairs.length; i++) {
      const newPairs = pairs.filter((_, index) => index !== i);
      pairsQueue.push(newPairs);
    }
  }
};

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = Number(inputList[0]);
  const heightList = inputList[1].split(" ").map(Number);

  /** @type {Record<number, number[]>} */
  const heightIndexesMap = {};
  for (let i = 0; i < heightList.length; i++) {
    const height = heightList[i];
    if (heightIndexesMap[height] == null) {
      heightIndexesMap[height] = [];
    }
    heightIndexesMap[height].push(i);
  }

  /** @type {{ height: string; indexes: number[] }[]} */
  const heightIndexesPairs = Object.keys(heightIndexesMap).map((key) => {
    return { height: key, indexes: heightIndexesMap[key] };
  });
  heightIndexesPairs.sort((a, b) => b.indexes.length - a.indexes.length);

  let maxEvenlyBuildings = 0;
  for (let i = 0; i < heightIndexesPairs.length; i++) {
    const { height, indexes } = heightIndexesPairs[i];
    if (indexes.length <= maxEvenlyBuildings) {
      break;
    }

    const evenlyBuildings = calcMaxEvenlyBuildings(indexes);
    if (maxEvenlyBuildings < evenlyBuildings) {
      maxEvenlyBuildings = evenlyBuildings;
    }
  }

  // 回答
  console.log(maxEvenlyBuildings);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
