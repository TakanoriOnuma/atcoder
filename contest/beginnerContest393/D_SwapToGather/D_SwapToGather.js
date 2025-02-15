/**
 * @see https://atcoder.jp/contests/abc393/tasks/abc393_d
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = Number(inputList[0]);
  const S = inputList[1];

  let count = 0;
  let start = 0;
  let end = N - 1;
  let sBundle = S[start] === "1" ? 1 : 0;
  let eBundle = S[end] === "1" ? 1 : 0;

  while (start <= end - 1) {
    if (sBundle <= eBundle) {
      start += 1;
      if (S[start] === "1") {
        sBundle += 1;
      } else {
        count += sBundle;
      }
    } else {
      end -= 1;
      if (S[end] === "1") {
        eBundle += 1;
      } else {
        count += eBundle;
      }
    }
  }

  // 回答
  console.log(count);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
