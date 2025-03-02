/**
 * @see https://atcoder.jp/contests/abc395/tasks/abc395_d
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, Q] = inputList[0].split(" ").map(Number);

  /**
   * 各鳩がどの巣にいるか
   * @type {Record<number, number>}
   */
  const pigeonMap = {};
  /**
   * 移動マップ
   * @type {Record<number, number>}
   */
  const moveMap = {};
  /**
   * 逆移動マップ
   * @type {Record<number, number>}
   */
  const invMoveMap = {};

  for (let i = 1; i <= N; i++) {
    pigeonMap[i] = i;
    moveMap[i] = i;
    invMoveMap[i] = i;
  }

  for (let i = 0; i < Q; i++) {
    const [op, a, b] = inputList[i + 1].split(" ").map(Number);

    switch (op) {
      case 1: {
        pigeonMap[a] = invMoveMap[b];
        break;
      }
      case 2: {
        const from1 = invMoveMap[a];
        const from2 = invMoveMap[b];
        invMoveMap[a] = from2;
        invMoveMap[b] = from1;
        moveMap[from1] = b;
        moveMap[from2] = a;
        break;
      }
      case 3: {
        const pos = pigeonMap[a];
        console.log(moveMap[pos]);
        break;
      }
    }
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
