/**
 * @see https://atcoder.jp/contests/abc393/tasks/abc393_a
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [S1, S2] = inputList[0].split(" ");

  if (S1 === "sick" && S2 === "sick") {
    console.log(1);
  } else if (S1 === "sick" && S2 === "fine") {
    console.log(2);
  } else if (S1 === "fine" && S2 === "sick") {
    console.log(3);
  } else {
    console.log(4);
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
