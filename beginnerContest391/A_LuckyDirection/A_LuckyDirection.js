/**
 * @see https://atcoder.jp/contests/abc391/tasks/abc391_a
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const D = inputList[0];

  const ansMap = {
    N: "S",
    E: "W",
    W: "E",
    S: "N",
    NE: "SW",
    NW: "SE",
    SE: "NW",
    SW: "NE",
  };

  // 回答
  console.log(ansMap[D]);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
