// @ts-check
/**
 * @see https://atcoder.jp/contests/abc402/tasks/abc402_a
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const chars = inputList[0].split("");

  // 回答
  console.log(
    chars
      //
      .filter((char) => char === char.toUpperCase())
      .join("")
  );
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
