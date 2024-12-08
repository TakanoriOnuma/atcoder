/**
 * @see https://atcoder.jp/contests/abc383/tasks/abc383_b
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [H, W, D] = inputList[0].split(" ").map(Number);
  const area = Array.from({ length: H }).map((_, i) => {
    return inputList[i + 1].split("");
  });

  /**
   *
   * @param {{ y: number; x: number }} pt1
   * @param {{ y: number; x: number }} pt2
   * @returns
   */
  const calcMahalanobisDistance = (pt1, pt2) => {
    return Math.abs(pt1.y - pt2.y) + Math.abs(pt1.x - pt2.x);
  };

  /**
   *
   * @param {{ y: number; x: number }} pt1
   * @param {{ y: number; x: number }} pt2
   */
  const calcHumidScore = (pt1, pt2) => {
    let score = 0;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (area[y][x] === "#") {
          continue;
        }

        if (
          calcMahalanobisDistance({ y, x }, pt1) <= D ||
          calcMahalanobisDistance({ y, x }, pt2) <= D
        ) {
          score += 1;
        }
      }
    }
    return score;
  };

  let result = 0;
  for (let p1 = 0; p1 < H * W; p1++) {
    const pt1 = { y: Math.floor(p1 / W), x: p1 % W };
    if (area[pt1.y][pt1.x] === "#") {
      continue;
    }
    for (let p2 = p1 + 1; p2 < H * W; p2++) {
      const pt2 = { y: Math.floor(p2 / W), x: p2 % W };
      if (area[pt2.y][pt2.x] === "#") {
        continue;
      }
      const score = calcHumidScore(pt1, pt2);
      // console.log(pt1, pt2, score);
      if (score > result) {
        result = score;
      }
    }
  }

  // 回答
  console.log(result);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
