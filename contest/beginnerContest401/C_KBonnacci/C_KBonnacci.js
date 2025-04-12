// @ts-check
/**
 * @see https://atcoder.jp/contests/abc401/tasks/abc401_c
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, K] = inputList[0].split(" ").map(Number);

  const MAX = 10 ** 9;

  const values = new Array(N + 1).fill(0);
  const sums = new Array(N + 1).fill(0);

  // 初期値の設定
  for (let i = 0; i < K; i++) {
    values[i] = 1;
    sums[i] = (sums[i - 1] || 0) + values[i];
  }

  // 累積和の差分で次の値を求める
  for (let i = K; i <= N; i++) {
    const prevSum = sums[i - 1];
    const value = (MAX + prevSum - (sums[i - K - 1] || 0)) % MAX;
    values[i] = value;
    sums[i] = (prevSum + values[i]) % MAX;
  }

  // 回答
  console.log(values[N]);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
