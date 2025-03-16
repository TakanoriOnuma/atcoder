// @ts-check
/**
 * @see https://atcoder.jp/contests/abc397/tasks/abc397_c
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = Number(inputList[0]);
  const A_List = inputList[1].split(" ").map(Number);

  /**
   * 各数字の範囲マップ。単数はその座標のみ、複数は範囲を示す
   * @type {Record<number, number | [number, number]>}
   */
  const rangeMap = {};
  for (let i = 0; i < N; i++) {
    const A = A_List[i];
    if (rangeMap[A] == null) {
      rangeMap[A] = i;
    } else {
      if (Array.isArray(rangeMap[A])) {
        rangeMap[A][1] = i;
      } else {
        rangeMap[A] = [rangeMap[A], i];
      }
    }
  }

  /**
   * 特定の座標での足し算マップ
   * @type {Array<number>}
   */
  const additionMap = new Array(N).fill(0);
  let count = 0;
  Object.values(rangeMap).forEach((range) => {
    count += 1;
    if (Array.isArray(range)) {
      additionMap[range[0]] += 1;
      additionMap[range[1]] -= 1;
    }
  });

  let result = 0;
  for (let i = 0; i < N; i++) {
    count += additionMap[i];
    result = Math.max(result, count);
  }

  // 回答
  console.log(result);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
