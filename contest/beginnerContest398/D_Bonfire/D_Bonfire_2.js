// @ts-check
/**
 * @see https://atcoder.jp/contests/abc398/tasks/abc398_d
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, Y, X] = inputList[0].split(" ").map(Number);
  const S = inputList[1];

  const requireDirs = {
    N: Y < 0 ? -Y : 0,
    E: X > 0 ? X : 0,
    S: Y > 0 ? Y : 0,
    W: X < 0 ? -X : 0,
  };

  const numDirs = { N: 0, E: 0, S: 0, W: 0 };

  // この解き方だと部分文字列のパターンが考慮できない
  for (let t = 0; t < N; t++) {
    const char = S[t];
    numDirs[char] += 1;

    const currentN = numDirs.N - requireDirs.N;
    const currentE = numDirs.E - requireDirs.E;
    const currentS = numDirs.S - requireDirs.S;
    const currentW = numDirs.W - requireDirs.W;
    if (currentN === currentS && currentE === currentW) {
      process.stdout.write("1");
    } else {
      process.stdout.write("0");
    }
  }

  console.log();
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
