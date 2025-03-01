/**
 * @see https://atcoder.jp/contests/abc394/tasks/abc394_e
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = Number(inputList[0]);
  const edges = inputList.slice(1, N + 1);
  const costs = Array.from({ length: N }, () => new Array(N));

  /** @type {{ x: number; y: number }[]} */
  const queueList = [];
  let queueIndex = 0;

  // 移動しない座標はコスト0
  for (let i = 0; i < N; i++) {
    costs[i][i] = 0;
    queueList.push({ y: i, x: i });
  }

  // 辺がある座標はコスト1
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (i === j || edges[i][j] === "-") {
        continue;
      }
      costs[i][j] = 1;
      queueList.push({ y: i, x: j });
    }
  }

  while (queueIndex < queueList.length) {
    const queue = queueList[queueIndex];
    queueIndex += 1;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        // queue地点から目的地と一つ前の地点が同じ文字の場合、回文対象でコストを2増やす
        if (
          edges[i][queue.y] !== "-" &&
          edges[i][queue.y] === edges[queue.x][j]
        ) {
          const currentCost = costs[i][j] ?? Number.MAX_SAFE_INTEGER;
          const cost = costs[queue.y][queue.x] + 2;
          if (cost < currentCost) {
            costs[i][j] = cost;
            queueList.push({ y: i, x: j });
          }
        }
      }
    }
  }

  // 回答
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      process.stdout.write(`${costs[i][j] ?? -1}`);
      if (j < N - 1) {
        process.stdout.write(" ");
      }
    }
    console.log();
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
