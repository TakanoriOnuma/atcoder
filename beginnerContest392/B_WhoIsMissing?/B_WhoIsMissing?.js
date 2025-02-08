/**
 * @see https://atcoder.jp/contests/abc392/tasks/abc392_b
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, M] = inputList[0].split(" ").map(Number);

  const numList = inputList[1].split(" ").map(Number);
  const existNumMap = {};
  for (const num of numList) {
    existNumMap[num] = true;
  }

  const countExistNum = Object.keys(existNumMap).length;
  const missingNum = N - countExistNum;
  const missingNumList = Array.from({ length: N }, (_, i) => i + 1).filter(
    (num) => !existNumMap[num]
  );

  // 回答
  console.log(missingNum);
  console.log(missingNumList.join(" "));
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
