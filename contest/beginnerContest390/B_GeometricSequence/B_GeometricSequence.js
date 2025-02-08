/**
 * @see https://atcoder.jp/contests/abc390/tasks/abc390_b
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = Number(inputList[0]);
  const [firstValue, secondValue, ...restValues] = inputList[1]
    .split(" ")
    .map(Number);

  /** 公比 */
  const commonRatio = secondValue / firstValue;

  let checkValue = secondValue;
  for (const value of restValues) {
    checkValue *= commonRatio;
    if (value !== checkValue) {
      console.log("No");
      return;
    }
  }

  // 回答
  console.log("Yes");
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
