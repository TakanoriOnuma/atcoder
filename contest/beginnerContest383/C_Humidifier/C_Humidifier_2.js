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

  /**
   * 加湿器起点の影響範囲テーブル
   */
  const affectArea = Array.from({ length: H }).map(() => Array(W).fill(-1));
  /**
   * 幅優先探索の実行キュー
   * @type {{ pt: { y: number; x: number }; distance: number }[]}
   */
  const queueList = [];

  // 初期キューを追加
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (area[y][x] === "H") {
        queueList.push({ pt: { y, x }, distance: D });
      }
    }
  }

  // キューを処理
  while (true) {
    const queue = queueList.shift();
    if (queue == null) {
      break;
    }

    const { pt, distance } = queue;
    if (area[pt.y][pt.x] === "#") {
      continue;
    }
    // 既にdistance以上の影響範囲がある場合はスキップ
    if (distance <= affectArea[pt.y][pt.x]) {
      continue;
    }
    affectArea[pt.y][pt.x] = distance;
    if (distance <= 0) {
      continue;
    }

    // distanceが1以上の時は上下左右のキューを追加
    if (pt.x > 0) {
      queueList.push({ pt: { y: pt.y, x: pt.x - 1 }, distance: distance - 1 });
    }
    if (pt.x < W - 1) {
      queueList.push({ pt: { y: pt.y, x: pt.x + 1 }, distance: distance - 1 });
    }
    if (pt.y > 0) {
      queueList.push({ pt: { y: pt.y - 1, x: pt.x }, distance: distance - 1 });
    }
    if (pt.y < H - 1) {
      queueList.push({ pt: { y: pt.y + 1, x: pt.x }, distance: distance - 1 });
    }
  }
  // console.log(affectArea);

  let total = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (affectArea[y][x] >= 0) {
        total++;
      }
    }
  }

  // 回答
  console.log(total);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
