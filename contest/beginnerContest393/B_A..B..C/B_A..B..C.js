/**
 * @see https://atcoder.jp/contests/abc393/tasks/abc393_b
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const S = inputList[0];

  let count = 0;
  for (let step = 1; step <= S.length; step++) {
    for (let i = 0; i < S.length - 2 * step; i++) {
      if (S[i] === "A" && S[i + step] === "B" && S[i + 2 * step] === "C") {
        count += 1;
      }
    }
  }

  // 回答
  console.log(count);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
