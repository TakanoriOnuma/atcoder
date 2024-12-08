/**
 * @see https://atcoder.jp/contests/abc383/tasks/abc383_c
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
      // 壁の場合は通れないフラグを立てて終了
      if (area[y][x] === "#") {
        road[y][x] = -1;
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
    spread(x + 1, y, d - 1);
    spread(x - 1, y, d - 1);
    spread(x, y + 1, d - 1);
    spread(x, y - 1, d - 1);
  };

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (area[y][x] === "H") {
        humidSpread(x, y, D);
      }
    }
  }

  // 回答
  let total = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      total += humidArea[y][x];
    }
  }
  console.log(total);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
