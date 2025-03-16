// @ts-check
/**
 * @see https://atcoder.jp/contests/abc397/tasks/abc397_b
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const S = inputList[0];
  const expectChars = ["i", "o"];

  let count = 0;
  for (let i = 0; i < S.length; i++) {
    if (S[i] !== expectChars[(i + count) % expectChars.length]) {
      count += 1;
    }
  }
  // 長さが奇数の場合は最後に'o'を追加する必要があるので+1する
  if ((count + S.length) % 2 === 1) {
    count += 1;
  }

  // 回答
  console.log(count);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
