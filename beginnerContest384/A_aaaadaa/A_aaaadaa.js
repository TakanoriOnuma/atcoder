/**
 * @see https://atcoder.jp/contests/abc384/tasks/abc384_a
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N_str, c1, c2] = inputList[0].split(" ");
  const N = Number(N_str);
  const S = inputList[1];

  const result = S.replaceAll(new RegExp(`[^${c1}]`, "g"), c2);

  // 回答
  console.log(result);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
