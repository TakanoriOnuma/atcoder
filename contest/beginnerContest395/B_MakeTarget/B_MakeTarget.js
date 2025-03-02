/**
 * @see https://atcoder.jp/contests/abc395/tasks/abc395_b
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = Number(inputList[0]);

  const area = Array.from({ length: N }, () => new Array(N).fill(0));

  let fillValue = 0;
  for (let level = 1; level < N / 2; level++) {
    fillValue = (fillValue + 1) % 2;
    for (let i = level; i < N - level; i++) {
      for (let j = level; j < N - level; j++) {
        area[i][j] = fillValue;
      }
    }
  }

  // 回答
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      process.stdout.write(area[i][j] === 0 ? "#" : ".");
    }
    console.log();
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
