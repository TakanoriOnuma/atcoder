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

  const distanceMap = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => -1)
  );
  distanceMap[startPos.y][startPos.x] = 0;

  /**
   * 実行キュー
   * @type {{ pos: { x: number; y: number }, direction: 'left' | 'right' | 'up' | 'down' }[]}
   */
  const queue = [];

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

  if (checkIsPassible({ x: startPos.x - 1, y: startPos.y })) {
    queue.push({
      pos: { x: startPos.x - 1, y: startPos.y },
      direction: "left",
    });
    distanceMap[startPos.y][startPos.x - 1] = 1;
  }
  if (checkIsPassible({ x: startPos.x + 1, y: startPos.y })) {
    queue.push({
      pos: { x: startPos.x + 1, y: startPos.y },
      direction: "right",
    });
    distanceMap[startPos.y][startPos.x + 1] = 1;
  }
  if (checkIsPassible({ x: startPos.x, y: startPos.y - 1 })) {
    queue.push({
      pos: { x: startPos.x, y: startPos.y - 1 },
      direction: "up",
    });
    distanceMap[startPos.y - 1][startPos.x] = 1;
  }
  if (checkIsPassible({ x: startPos.x, y: startPos.y + 1 })) {
    queue.push({
      pos: { x: startPos.x, y: startPos.y + 1 },
      direction: "down",
    });
    distanceMap[startPos.y + 1][startPos.x] = 1;
  }

  /**
   * 確認したい座標を取得する
   * @param {{ x: number; y: number }} pos
   * @param {'left' | 'right' | 'up' | 'down'} direction
   */
  const getCheckPositions = (pos, direction) => {
    switch (direction) {
      case "left":
      case "right":
        return [
          { x: pos.x, y: pos.y - 1, direction: "up" },
          { x: pos.x, y: pos.y + 1, direction: "down" },
        ];
      case "up":
      case "down":
        return [
          { x: pos.x - 1, y: pos.y, direction: "left" },
          { x: pos.x + 1, y: pos.y, direction: "right" },
        ];
    }
  };

  while (queue.length > 0 && distanceMap[goalPos.y][goalPos.x] === -1) {
    const item = queue.shift();
    if (item == null) {
      break;
    }
    const { pos, direction } = item;
    const distance = distanceMap[pos.y][pos.x];
    const nextDistance = distance + 1;

    const checkPositions = getCheckPositions(pos, direction);
    checkPositions.forEach((checkPos) => {
      if (!checkIsPassible(checkPos)) {
        return;
      }
      if (
        distanceMap[checkPos.y][checkPos.x] !== -1 &&
        nextDistance >= distanceMap[checkPos.y][checkPos.x]
      ) {
        return;
      }
      distanceMap[checkPos.y][checkPos.x] = nextDistance;
      const { direction, ...pos } = checkPos;
      queue.push({ pos, direction });
    });
  }

  // 回答
  console.log(distanceMap[goalPos.y][goalPos.x]);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
