// @ts-check
/**
 * @see https://atcoder.jp/contests/abc398/tasks/abc398_c
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
   * 各数字が何番目に出現したかのマッピング情報
   * @type {Record<number, number[]>}
   */
  const numListMap = {};
  A_List.forEach((A, i) => {
    if (numListMap[A] == null) {
      numListMap[A] = [i];
    } else {
      numListMap[A].push(i);
    }
  });

  let maxAloneNumber = -1;
  Object.keys(numListMap).forEach((num) => {
    if (numListMap[num].length === 1) {
      maxAloneNumber = Math.max(maxAloneNumber, Number(num));
    }
  });

  // 回答
  console.log(maxAloneNumber === -1 ? -1 : numListMap[maxAloneNumber][0] + 1);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
