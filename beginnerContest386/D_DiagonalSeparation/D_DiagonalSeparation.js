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

  /** @type {{ x: number; y: number }[]} */
  const blackRegionList = [];
  /** @type {{ x: number; y: number }[]} */
  const whiteRegionList = [];

  const isValidPoint = (x, y, c) => {
    if (c === "B") {
      const isIncluded = whiteRegionList.some((region) => {
        return x <= region.x && y <= region.y;
      });
      return !isIncluded;
    }
    if (c === "W") {
      const isIncluded = blackRegionList.some((region) => {
        return x >= region.x && y >= region.y;
      });
      return !isIncluded;
    }
  };

  let result = true;
  for (let i = 0; i < M; i++) {
    const [X_Str, Y_Str, C] = inputList[i + 1].split(" ");
    const X = Number(X_Str);
    const Y = Number(Y_Str);
    if (!isValidPoint(X, Y, C)) {
      result = false;
      break;
    }

    // 領域の更新をする
    if (C === "B") {
      //
    } else if (C === "W") {
      //
    }
  }

  // 回答
  console.log(result ? "Yes" : "No");
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
