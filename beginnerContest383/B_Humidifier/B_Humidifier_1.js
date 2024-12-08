/**
 * @see https://atcoder.jp/contests/abc383/tasks/abc383_b
 */

const DEBUG = false;

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
   * @param {{ x: number; y: number }} pt1
   * @param {{ x: number; y: number }} pt2
   */
  const calcScore = (pt1, pt2) => {
    const humidArea = Array.from({ length: H }).map(() => Array(W).fill(0));

    /**
     *
     * @param {number} px
     * @param {number} py
     */
    const humid = (px, py) => {
      if (px < 0 || px >= W || py < 0 || py >= H) {
        return;
      }
      if (area[py][px] === "#") {
        return;
      }
      humidArea[py][px] = 1;
    };

    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} d
     */
    const humidSpread = (x, y, d) => {
      const road = Array.from({ length: H }).map(() => Array(W).fill(0));

      const spread = (x, y, remainD) => {
        if (x < 0 || x >= W || y < 0 || y >= H) {
          return;
        }
        if (road[y][x] !== 0) {
          return;
        }
        humid(x, y);
        road[y][x] = 1;

        if (remainD <= 0) {
          return;
        }
        spread(x + 1, y, remainD - 1);
        spread(x - 1, y, remainD - 1);
        spread(x, y + 1, remainD - 1);
        spread(x, y - 1, remainD - 1);
      };

      humid(x, y);
      road[y][x] = 1;
      if (d <= 0) {
        return;
      }
      spread(x + 1, y, d - 1);
      spread(x - 1, y, d - 1);
      spread(x, y + 1, d - 1);
      spread(x, y - 1, d - 1);
    };

    humidSpread(pt1.x, pt1.y, D);
    humidSpread(pt2.x, pt2.y, D);

    let total = 0;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        total += humidArea[y][x];
      }
    }
    return total;
  };

  /**
   *
   * @param {{ x: number; y: number }} pt1
   */
  const calc = (pt1) => {
    let max = 0;
    for (let p = pt1.y * H + pt1.x + 1; p < H * W; p++) {
      const pt2 = { x: p % W, y: Math.floor(p / W) };
      if (area[pt2.y][pt2.x] === "#") {
        continue;
      }
      const score = calcScore(pt1, pt2);
      if (DEBUG) {
        console.log(pt1, pt2, calcScore(pt1, pt2));
      }
      max = Math.max(max, score);
    }
    return max;
  };

  let max = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (area[y][x] === "#") {
        continue;
      }
      const pt1 = { x, y };
      max = Math.max(max, calc(pt1));
    }
  }

  // 回答
  console.log(max);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
