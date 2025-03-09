// @ts-check
/**
 * @see https://atcoder.jp/contests/abc396/tasks/abc396_d
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, M] = inputList[0].split(" ").map(Number);

  /**
   * 値付き方向リスト
   * @type {Record<number, { to: number; value: BigInt }[]>}
   */
  const pathToValueMap = {};
  for (let i = 0; i < M; i++) {
    const [uStr, vStr, wStr] = inputList[i + 1].split(" ");
    const u = Number(uStr);
    const v = Number(vStr);
    const w = BigInt(wStr);
    if (pathToValueMap[u] == null) {
      pathToValueMap[u] = [];
    }
    if (pathToValueMap[v] == null) {
      pathToValueMap[v] = [];
    }
    pathToValueMap[u].push({ to: v, value: w });
    pathToValueMap[v].push({ to: u, value: w });
  }

  /**
   * キューリスト
   * @type {{ value: BigInt; pos: number; visitedMap: Record<number, boolean> }[]}
   */
  const queueList = [{ value: BigInt(0), pos: 1, visitedMap: { 1: true } }];
  let queueIndex = 0;

  /** @type {BigInt | null} */
  let result = null;

  while (queueIndex < queueList.length) {
    const queue = queueList[queueIndex];
    queueIndex += 1;

    const toValues = pathToValueMap[queue.pos];
    if (toValues == null) {
      continue;
    }
    for (const toValue of toValues) {
      if (queue.visitedMap[toValue.to]) {
        continue;
      }
      /** @type {BigInt} */
      const nextValue = queue.value ^ toValue.value;
      if (toValue.to === N) {
        if (result == null || nextValue < result) {
          result = nextValue;
        }
        continue;
      }
      const nextVisitedMap = { ...queue.visitedMap, [toValue.to]: true };
      queueList.push({
        value: nextValue,
        pos: toValue.to,
        visitedMap: nextVisitedMap,
      });
    }
  }

  // 回答
  console.log(result?.toString());
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
