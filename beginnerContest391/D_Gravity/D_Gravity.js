/**
 * @see https://atcoder.jp/contests/abc391/tasks/abc391_d
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, W] = inputList[0].split(" ").map(Number);

  /** そのブロックが何番目に積まれているかのマッピング */
  const blockLevelMap = {};

  /**
   * X軸に積まれているブロックを格納する
   * @type {{ blockNo: number; pos: number }[][]}
   */
  const layersList = Array.from({ length: W }, () => []);
  for (let i = 0; i < N; i++) {
    const [X, Y] = inputList[i + 1].split(" ").map(Number);
    layersList[X - 1].push({ blockNo: i + 1, pos: Y });
  }

  let maxLevel = 0;
  layersList.forEach((layers) => {
    layers.sort((a, b) => a.pos - b.pos);
    layers.forEach((layer, index) => {
      blockLevelMap[layer.blockNo] = index;
    });
    maxLevel = Math.max(maxLevel, layers.length);
  });

  /** 積層されるブロック数に応じた最大存続可能時間 */
  const maxTimeMapByLevel = {};
  for (let t = 0; t < maxLevel; t++) {
    let maxTime = 0;
    for (layers of layersList) {
      const layer = layers[t];
      if (layer == null) {
        maxTime = Number.POSITIVE_INFINITY;
        break;
      }
      maxTime = Math.max(maxTime, layer.pos);
    }
    maxTimeMapByLevel[t] = maxTime;
  }

  // 回答
  const Q = Number(inputList[N + 1]);
  for (let i = 0; i < Q; i++) {
    const [T, A] = inputList[N + 2 + i].split(" ").map(Number);
    const blockLevel = blockLevelMap[A];
    const maxTime = maxTimeMapByLevel[blockLevel];
    console.log(T < maxTime ? "Yes" : "No");
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
