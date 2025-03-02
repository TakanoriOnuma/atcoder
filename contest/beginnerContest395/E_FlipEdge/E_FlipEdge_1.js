/**
 * @see https://atcoder.jp/contests/abc395/tasks/abc395_e
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, M, X] = inputList[0].split(" ").map(Number);

  /**
   * 方向リスト
   * @type {Record<number, number[]>}
   */
  const dirsMap = {};
  /**
   * 逆方向リスト
   * @type {Record<number, number[]>}
   */
  const invDirsMap = {};

  // 方向リストを作成
  for (let i = 0; i < M; i++) {
    const [u, v] = inputList[i + 1].split(" ").map(Number);
    if (!dirsMap[u]) {
      dirsMap[u] = [];
    }
    dirsMap[u].push(v);
    if (!invDirsMap[v]) {
      invDirsMap[v] = [];
    }
    invDirsMap[v].push(u);
  }

  /** キューリスト */
  const queueList = [
    {
      node: 1,
      isFlipped: false,
    },
  ];
  let queueIndex = 0;

  const costs = new Array(N + 1).fill(Number.MAX_SAFE_INTEGER);
  costs[1] = 0;

  while (queueIndex < queueList.length) {
    const queue = queueList[queueIndex];
    queueIndex += 1;

    const [dirs, invDirs] = queue.isFlipped
      ? [invDirsMap[queue.node], dirsMap[queue.node]]
      : [dirsMap[queue.node], invDirsMap[queue.node]];
    if (dirs) {
      for (const dir of dirs) {
        const cost = costs[queue.node] + 1;
        if (cost < costs[dir]) {
          costs[dir] = cost;
          queueList.push({
            node: dir,
            isFlipped: queue.isFlipped,
          });
        }
      }
    }
    if (invDirs) {
      for (const invDir of invDirs) {
        const cost = costs[queue.node] + 1 + X;
        if (cost < costs[invDir]) {
          costs[invDir] = cost;
          queueList.push({
            node: invDir,
            isFlipped: !queue.isFlipped,
          });
        }
      }
    }
  }

  // 回答
  console.log(costs[N] === Number.MAX_SAFE_INTEGER ? -1 : costs[N]);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
