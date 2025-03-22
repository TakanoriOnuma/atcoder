// @ts-check
/**
 * @see https://atcoder.jp/contests/abc398/tasks/abc398_b
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const A_List = inputList[0].split(" ").map(Number);

  /**
   * 各数字を何枚持っているかのマッピング情報
   * @type {Record<number, number>}
   */
  const numCardMap = {};
  A_List.forEach((A) => {
    if (numCardMap[A] == null) {
      numCardMap[A] = 1;
    } else {
      numCardMap[A] += 1;
    }
  });

  const values = Object.values(numCardMap);
  const hasThree = values.some((v) => v >= 3);
  const numTwoCards = values.filter((v) => v >= 2).length;

  // 回答
  console.log(hasThree && numTwoCards >= 2 ? "Yes" : "No");
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
