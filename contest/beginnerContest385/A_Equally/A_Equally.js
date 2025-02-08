/**
 * @see https://atcoder.jp/contests/abc385/tasks/abc385_a
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [A, B, C] = inputList[0].split(" ").map(Number);

  if (A === B && B === C) {
    console.log("Yes");
    return;
  }
  if (A + B === C) {
    console.log("Yes");
    return;
  }
  if (B + C === A) {
    console.log("Yes");
    return;
  }
  if (C + A === B) {
    console.log("Yes");
    return;
  }
  console.log("No");
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
