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

  const X_dir = { N: 0, E: 1, S: 0, W: -1 };
  const Y_dir = { N: -1, E: 0, S: 1, W: 0 };

  for (let t = 0; t < N; t++) {
    const pos = { x: X, y: Y };
    let match = false;
    for (let i = t; i >= 0; i--) {
      pos.x -= X_dir[S[i]];
      pos.y -= Y_dir[S[i]];
      if (pos.x === 0 && pos.y === 0) {
        match = true;
        break;
      }
    }
    process.stdout.write(match ? "1" : "0");
  }

  console.log();
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
