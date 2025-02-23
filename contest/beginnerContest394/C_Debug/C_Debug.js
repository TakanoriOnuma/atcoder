/**
 * @see https://atcoder.jp/contests/abc394/tasks/abc394_c
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const chars = inputList[0].split("");

  const length = chars.length;
  for (let i = length - 1; i >= 1; i--) {
    if (chars[i - 1] === "W" && chars[i] === "A") {
      chars[i - 1] = "A";
      chars[i] = "C";
    }
  }

  // 回答
  for (const char of chars) {
    process.stdout.write(char);
  }
  console.log();
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
