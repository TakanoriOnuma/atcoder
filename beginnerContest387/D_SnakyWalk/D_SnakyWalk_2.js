/**
 * @see https://atcoder.jp/contests/abc387/tasks/abc387_d
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [H, W] = inputList[0].split(" ").map(Number);

  const startPos = { x: 0, y: 0 };
  const goalPos = { x: 0, y: 0 };
  const map = inputList.slice(1, H + 1).map((line, index) => {
    const startIndex = line.indexOf("S");
    if (startIndex !== -1) {
      startPos.x = startIndex;
      startPos.y = index;
    }
    const goalIndex = line.indexOf("G");
    if (goalIndex !== -1) {
      goalPos.x = goalIndex;
      goalPos.y = index;
    }
    return line.split("");
  });

  /**
   * 指定の座標は通行可能か
   * @param {{ x: number; y: number }} pos - 座標
   */
  const checkIsPassible = (pos) => {
    if (pos.x < 0 || pos.x >= W) {
      return false;
    }
    if (pos.y < 0 || pos.y >= H) {
      return false;
    }
    if (map[pos.y][pos.x] === "#") {
      return false;
    }
    return true;
  };

  /** 座標ごとに移動する方向 */
  const moveVectorsByPoint = [
    // 縦方向
    [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
    ],
    // 横方向
    [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
    ],
  ];
  let distance = Number.POSITIVE_INFINITY;
  for (let offset = 0; offset < 2; offset++) {
    const queue = [startPos];
    const distanceMap = Array.from({ length: H }, () =>
      Array.from({ length: W }, () => Number.POSITIVE_INFINITY)
    );
    distanceMap[startPos.y][startPos.x] = 0;

    while (
      queue.length > 0 &&
      distanceMap[goalPos.y][goalPos.x] === Number.POSITIVE_INFINITY
    ) {
      const pos = queue.shift();
      if (pos == null) {
        break;
      }
      const currentDistance = distanceMap[pos.y][pos.x];
      const nextDistance = currentDistance + 1;

      const moveVectors = moveVectorsByPoint[(pos.y + pos.x + offset) % 2];
      const checkPositions = moveVectors.map((vec) => {
        return { x: pos.x + vec.x, y: pos.y + vec.y };
      });

      checkPositions.forEach((checkPos) => {
        if (!checkIsPassible(checkPos)) {
          return;
        }
        if (nextDistance >= distanceMap[checkPos.y][checkPos.x]) {
          return;
        }
        distanceMap[checkPos.y][checkPos.x] = nextDistance;
        queue.push(checkPos);
      });
    }

    distance = Math.min(distance, distanceMap[goalPos.y][goalPos.x]);
  }

  // 回答
  console.log(distance === Number.POSITIVE_INFINITY ? -1 : distance);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
