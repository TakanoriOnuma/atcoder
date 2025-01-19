/**
 * @see https://atcoder.jp/contests/abc389/tasks/abc389_b
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const X = BigInt(inputList[0]);

  if (X === 1n) {
    // 回答
    console.log(1);
    return;
  }

  let x = X;
  let value = 0n;
  while (x > 1n) {
    value += 1n;
    x /= value;
  }

  // 回答
  console.log(Number(value));
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
