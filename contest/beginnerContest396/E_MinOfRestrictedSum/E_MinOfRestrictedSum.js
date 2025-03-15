// @ts-check
/**
 * @see https://atcoder.jp/contests/abc396/tasks/abc396_e
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, M] = inputList[0].split(" ").map(Number);

  /**
   * 行き先と条件値のパスマップ
   * @type {Record<number, { to: number, value: number }[]>}
   */
  const pathsWithValueMap = {};
  for (let i = 0; i < M; i++) {
    const [x, y, z] = inputList[i + 1].split(" ").map(Number);
    if (!pathsWithValueMap[x]) {
      pathsWithValueMap[x] = [];
    }
    pathsWithValueMap[x].push({ to: y, value: z });
    if (!pathsWithValueMap[y]) {
      pathsWithValueMap[y] = [];
    }
    pathsWithValueMap[y].push({ to: x, value: z });
  }

  /**
   * 各頂点の値
   * @type {number[]}
   */
  const values = Array(N + 1);
  let maxValue = 0;

  /**
   * 経路を探索する
   * @param {number} pos - 現在地
   * @param {number[]} visitedList - 訪問済みリスト
   * @returns {number[] | null} - 経路。見つからない場合はnull
   */
  const searchRoutes = (pos, visitedList = [pos]) => {
    const currentPosValue = values[pos];
    // 厳密にはnullチェックした方が良い
    // if (currentPosValue == null) {
    //   return null
    // }
    const pathsWithValue = pathsWithValueMap[pos] ?? [];
    for (const { to, value } of pathsWithValue) {
      const destValue = values[to];
      // 既に値が確定している場合は、条件を満たすかだけチェックする
      if (destValue != null) {
        if ((currentPosValue ^ destValue) === value) {
          continue;
        } else {
          return null;
        }
      }
      // 未確定の場合は、値を決定して探索を続ける
      values[to] = currentPosValue ^ value;
      maxValue = Math.max(maxValue, values[to]);
      visitedList.push(to);
      const result = searchRoutes(to, visitedList);
      if (result == null) {
        return null;
      }
    }
    return visitedList;
  };

  /** @type {number[]} */
  const answers = new Array(N + 1).fill(0);
  for (let pos = 1; pos <= N; pos++) {
    if (values[pos] != null) {
      continue;
    }
    values[pos] = 0;
    maxValue = 0;
    const routes = searchRoutes(pos);
    if (routes == null) {
      console.log(-1);
      return;
    }

    const numBits = maxValue.toString(2).length;
    for (let bits = 0; bits < numBits; bits++) {
      const mask = 1 << bits;

      // ビットが1の個数を数える
      let count = 0;
      for (const pos of routes) {
        if (values[pos] & mask) {
          count++;
        }
      }

      // 個数が半分以下の場合は元々の値のまま加える
      if (count <= routes.length / 2) {
        for (const pos of routes) {
          answers[pos] |= values[pos] & mask;
        }
      } else {
        // 逆に多い場合はビットを反転して加える
        for (const pos of routes) {
          answers[pos] |= (values[pos] ^ mask) & mask;
        }
      }
    }
  }

  // 回答
  for (let i = 1; i <= N; i++) {
    process.stdout.write(`${answers[i]} `);
  }
  console.log();
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
