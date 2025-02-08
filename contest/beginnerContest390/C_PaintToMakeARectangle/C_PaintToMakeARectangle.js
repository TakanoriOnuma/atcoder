/**
 * @see https://atcoder.jp/contests/abc390/tasks/abc390_c
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [H, W] = inputList[0].split(" ").map(Number);

  /** @type {{ x: number; y: number }[]} */
  const whitePoints = [];
  let leftTop = { x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY };
  let rightBottom = {
    x: -1,
    y: -1,
  };

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      const char = inputList[i + 1][j];
      switch (char) {
        case "#":
          leftTop.x = Math.min(leftTop.x, j);
          leftTop.y = Math.min(leftTop.y, i);
          rightBottom.x = Math.max(rightBottom.x, j);
          rightBottom.y = Math.max(rightBottom.y, i);
          break;
        case ".":
          whitePoints.push({ x: j, y: i });
          break;
      }
    }
  }

  const result = whitePoints.every((point) => {
    return (
      point.x < leftTop.x ||
      point.x > rightBottom.x ||
      point.y < leftTop.y ||
      point.y > rightBottom.y
    );
  });

  // 回答
  console.log(result ? "Yes" : "No");
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
