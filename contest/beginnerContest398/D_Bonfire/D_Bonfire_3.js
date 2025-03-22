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

  const originPos = { x: 0, y: 0 };
  const targetPos = { x: X, y: Y };

  /**
   * 座標キーを取得
   * @param {{ x: number; y: number }} pos - 座標
   */
  const getPosKey = (pos) => `${pos.x},${pos.y}`;
  /**
   * 配置済みの座標キーのマッピング情報
   * @type {Record<string, boolean>}
   */
  const posKeyMap = {};
  posKeyMap[getPosKey(originPos)] = true;

  for (let t = 0; t < N; t++) {
    const char = S[t];
    originPos.x -= X_dir[char];
    originPos.y -= Y_dir[char];
    posKeyMap[getPosKey(originPos)] = true;

    targetPos.x -= X_dir[char];
    targetPos.y -= Y_dir[char];

    if (posKeyMap[getPosKey(targetPos)]) {
      process.stdout.write("1");
    } else {
      process.stdout.write("0");
    }
  }

  console.log();
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
