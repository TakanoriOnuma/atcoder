// @ts-check
/**
 * @see https://atcoder.jp/contests/abc398/tasks/abc398_a
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = Number(inputList[0]);

  const isEven = N % 2 === 0;
  const halfStr = "-".repeat(isEven ? N / 2 - 1 : Math.floor(N / 2));
  const centerStr = N % 2 === 0 ? "==" : "=";

  // 回答
  console.log(`${halfStr}${centerStr}${halfStr}`);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
