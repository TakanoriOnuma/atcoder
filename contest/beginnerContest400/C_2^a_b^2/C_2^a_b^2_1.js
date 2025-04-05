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

  // aの最大値を求める
  let a = 0n;
  let value = 1n;
  while (value <= N) {
    value *= 2n;
    a += 1n;
  }
  a -= 1n;
  value /= 2n;

  let b = 1n;
  let count = a;
  while (true) {
    b += 2n;
    // 偶数の時はaの値の組み合わせと被るためスキップ
    // if (b % 2n === 0n) {
    //   continue;
    // }

    const base = b ** 2n;
    while (value * base > N && a > 0n) {
      a -= 1n;
      value /= 2n;
    }

    if (a === 0n) {
      break;
    }
    count += a;
  }

  // 回答
  console.log(count.toString());
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
