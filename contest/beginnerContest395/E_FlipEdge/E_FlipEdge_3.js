// @ts-check
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
   * 重み付き方向リスト
   * @type {Record<number, { to: number; weight: number }[]>}
   */
  const dirsMap = {};

  // 元のグラフとの反転に対応する辺
  for (let i = 0; i < N; i++) {
    dirsMap[i + 1] = [{ to: i + N + 1, weight: X }];
    dirsMap[i + N + 1] = [{ to: i + 1, weight: X }];
  }

  // 辺を作成
  for (let i = 0; i < M; i++) {
    const [u, v] = inputList[i + 1].split(" ").map(Number);
    dirsMap[u].push({ to: v, weight: 1 });
    dirsMap[v + N].push({ to: u + N, weight: 1 });
  }

  /** キューリスト */
  const queueList = [1];
  let queueIndex = 0;

  const costs = new Array(2 * N + 1).fill(Number.MAX_SAFE_INTEGER);
  costs[1] = 0;

  while (queueIndex < queueList.length) {
    const queue = queueList[queueIndex];
    queueIndex += 1;

    for (const dir of dirsMap[queue] ?? []) {
      const cost = costs[queue] + dir.weight;
      if (cost < costs[dir.to]) {
        costs[dir.to] = cost;
        queueList.push(dir.to);
      }
    }
  }

  // 回答
  const result = Math.min(costs[N], costs[2 * N]);
  console.log(result);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
