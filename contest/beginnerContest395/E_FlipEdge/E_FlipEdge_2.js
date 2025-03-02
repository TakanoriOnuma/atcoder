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
  const queueList = [1];
  let queueIndex = 0;

  const costs = new Array(N + 1).fill(Number.MAX_SAFE_INTEGER);
  costs[1] = 0;
  const invCosts = new Array(N + 1).fill(Number.MAX_SAFE_INTEGER);
  invCosts[1] = X;

  while (queueIndex < queueList.length) {
    const queue = queueList[queueIndex];
    queueIndex += 1;

    const dirs = dirsMap[queue] ?? [];
    const invDirs = invDirsMap[queue] ?? [];

    for (const dir of dirs) {
      let updated = false;
      const cost = costs[queue] + 1;
      if (cost < costs[dir]) {
        costs[dir] = cost;
        updated = true;
      }

      // 逆向きにした時のコストも計算する
      const invCost = cost + X;
      if (invCost < invCosts[dir]) {
        invCosts[dir] = invCost;
        updated = true;
      }

      if (updated) {
        queueList.push(dir);
      }
    }

    for (const invDir of invDirs) {
      let updated = false;
      const invCost = invCosts[queue] + 1;
      if (invCost < invCosts[invDir]) {
        invCosts[invDir] = invCost;
        updated = true;
      }

      // 正順に戻した時のコストも計算する
      const cost = invCost + X;
      if (cost < costs[invDir]) {
        costs[invDir] = cost;
        updated = true;
      }

      if (updated) {
        queueList.push(invDir);
      }
    }
  }

  // 回答
  const result = Math.min(costs[N], invCosts[N]);
  console.log(result === Number.MAX_SAFE_INTEGER ? -1 : result);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
