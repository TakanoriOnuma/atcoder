/**
 * @see https://atcoder.jp/contests/abc391/tasks/abc391_b
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, M] = inputList[0].split(" ").map(Number);

  const S_table = Array.from({ length: N }, (_, i) => {
    return inputList[i + 1].split("");
  });
  const T_table = Array.from({ length: M }, (_, i) => {
    return inputList[i + N + 1].split("");
  });

  /**
   * 渡した座標で包含状態になっているか
   * @param {number} startY
   * @param {number} startX
   * @returns
   */
  const isIncluded = (startY, startX) => {
    for (let i = 0; i < M; i++) {
      for (let j = 0; j < M; j++) {
        if (S_table[startY + i][startX + j] !== T_table[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  for (let a = 0; a <= N - M; a++) {
    for (let b = 0; b <= N - M; b++) {
      if (isIncluded(a, b)) {
        console.log(`${a + 1} ${b + 1}`);
        return;
      }
    }
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
