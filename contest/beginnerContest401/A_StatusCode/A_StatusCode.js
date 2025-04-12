// @ts-check
/**
 * @see https://atcoder.jp/contests/abc401/tasks/abc401_a
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const S = Number(inputList[0]);

  // 回答
  if (S >= 200 && S < 300) {
    console.log("Success");
    return;
  }
  console.log("Failure");
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
