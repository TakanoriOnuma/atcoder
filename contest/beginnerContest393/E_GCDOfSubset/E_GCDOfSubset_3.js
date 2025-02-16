/**
 * @see https://atcoder.jp/contests/abc393/tasks/abc393_e
 */

const DEBUG = false;

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  DEBUG && console.time("Main");

  const inputList = input.split("\n");
  const [N, K] = inputList[0].split(" ").map(Number);
  const A_List = inputList[1].split(" ").map(Number);

  const max = Math.max(...A_List);

  /**
   * nの個数リスト
   * @type {number[]}
   */
  const COUNT_LIST = Array(max + 1).fill(0);
  A_List.forEach((a) => {
    COUNT_LIST[a] += 1;
  });

  /**
   * nの倍数の個数リスト
   * @type {number[]}
   */
  const COUNT_TIMES_LIST = Array(max + 1).fill(0);
  for (let n = 1; n <= max; n++) {
    for (let d = n; d <= max; d += n) {
      COUNT_TIMES_LIST[n] += COUNT_LIST[d];
    }
  }

  /**
   * nとその他K個を選んだ時の最大公約数リスト
   */
  const MAX_GCD_LIST = Array(max + 1).fill(0);
  for (let d = 1; d <= max; d++) {
    if (COUNT_TIMES_LIST[d] < K) {
      continue;
    }
    for (let n = d; n <= max; n += d) {
      MAX_GCD_LIST[n] = Math.max(MAX_GCD_LIST[n], d);
    }
  }

  for (const a of A_List) {
    console.log(MAX_GCD_LIST[a]);
  }

  DEBUG && console.timeEnd("Main");
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
