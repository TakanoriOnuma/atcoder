/**
 * @see https://atcoder.jp/contests/abc387/tasks/abc387_b
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const X = Number(inputList[0]);

  let total = 0;
  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 9; j++) {
      const value = i * j;
      if (value !== X) {
        total += value;
      }
    }
  }

  // 回答
  console.log(total);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
