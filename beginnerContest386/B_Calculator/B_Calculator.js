/**
 * @see https://atcoder.jp/contests/abc386/tasks/abc386_b
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const S = inputList[0];

  let cursor = 0;
  let count = 0;
  while (cursor < S.length) {
    const char = S[cursor];
    if (char === "0" && S[cursor + 1] === "0") {
      count += 1;
      cursor += 2;
      continue;
    }
    count += 1;
    cursor += 1;
  }

  // 回答
  console.log(count);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
