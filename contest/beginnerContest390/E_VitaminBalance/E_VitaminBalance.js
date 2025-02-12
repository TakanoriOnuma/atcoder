/**
 * @see https://atcoder.jp/contests/abc390/editorial/12052
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, X] = inputList[0].split(" ").map(Number);

  const dp = Array.from({ length: 3 }, (_) => {
    /** @type {number[]} */
    const arr = Array(X + 1).fill(Number.NEGATIVE_INFINITY);
    arr[0] = 0;
    return arr;
  });

  // 各カロリーに対応したビタミン量を算出
  for (let i = 0; i < N; i++) {
    const [V, A, C] = inputList[i + 1].split(" ").map(Number);
    for (let j = X - 1; j >= C; j--) {
      dp[V - 1][j] = Math.max(dp[V - 1][j], dp[V - 1][j - C] + A);
    }
  }

  // 各カロリー以下のビタミン最大値を算出
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < X; j++) {
      dp[i][j + 1] = Math.max(dp[i][j + 1], dp[i][j]);
    }
  }

  // Xカロリーに達するまで貪欲法でバランス良くビタミンを摂取
  let [v1Index, v2Index, v3Index] = [0, 0, 0];
  for (let i = 0; i < X; i++) {
    const v1 = dp[0][v1Index];
    const v2 = dp[1][v2Index];
    const v3 = dp[2][v3Index];
    if (v1 <= v2 && v1 <= v3) {
      v1Index += 1;
      continue;
    }
    if (v2 <= v3) {
      v2Index += 1;
      continue;
    }
    v3Index += 1;
  }

  // 摂取したビタミンの中で最小値を出力
  console.log(Math.min(dp[0][v1Index], dp[1][v2Index], dp[2][v3Index]));
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
