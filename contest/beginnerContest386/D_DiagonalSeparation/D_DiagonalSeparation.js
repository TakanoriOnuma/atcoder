/**
 * @see https://atcoder.jp/contests/abc386/tasks/abc386_d
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, M] = inputList[0].split(" ").map(Number);

  /** @type {{ x: number; y: number; c: 'W' | 'B' }[]} */
  const points = [];
  for (let i = 0; i < M; i++) {
    const [X_Str, Y_Str, C] = inputList[i + 1].split(" ");
    points.push({
      x: Number(X_Str),
      y: Number(Y_Str),
      c: C,
    });
  }
  points.sort((aPoint, bPoint) => {
    if (aPoint.x === bPoint.x) {
      return aPoint.y - bPoint.y;
    }
    return aPoint.x - bPoint.x;
  });

  // xが小さい順に並べていて縦方向の条件は満たしているため、yの横方向の条件を満たせるかをチェックする
  let result = true;
  let yMax = Number.MAX_SAFE_INTEGER;
  for (point of points) {
    if (point.c === "W") {
      yMax = Math.min(yMax, point.y);
    } else {
      if (point.y >= yMax) {
        result = false;
        break;
      }
    }
  }

  // 回答
  console.log(result ? "Yes" : "No");
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
