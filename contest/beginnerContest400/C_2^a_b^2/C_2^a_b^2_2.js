// @ts-check
/**
 * @see https://atcoder.jp/contests/abc400/tasks/abc400_c
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = BigInt(inputList[0]);

  const MAX = 10n ** (18n / 2n);

  let count = 0n;
  {
    let left = 0n;
    let right = MAX;
    while (left + 1n < right) {
      const mid = (left + right) / 2n;
      if (2n * mid ** 2n <= N) {
        left = mid;
      } else {
        right = mid;
      }
    }
    count += left;
  }

  {
    let left = 0n;
    let right = MAX;
    while (left + 1n < right) {
      const mid = (left + right) / 2n;
      if (4n * mid ** 2n <= N) {
        left = mid;
      } else {
        right = mid;
      }
    }
    count += left;
  }

  // 回答
  console.log(count.toString());
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
