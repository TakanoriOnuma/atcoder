// @ts-check
/**
 * @see https://atcoder.jp/contests/abc399/tasks/abc399_c
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, M] = inputList[0].split(" ").map(Number);

  /**
   * 各頂点が接続されている辺のマッピング情報
   * @type {Record<number, number[]>}
   */
  const edgesMap = {};
  for (let i = 0; i < M; i++) {
    const [u, v] = inputList[i + 1].split(" ").map(Number);
    if (edgesMap[u] == null) {
      edgesMap[u] = [];
    }
    edgesMap[u].push(v);
    // u < vなので逆向きを考慮しなくて良さそう
    // if (edgesMap[v] == null) {
    //   edgesMap[v] = [];
    // }
    // edgesMap[v].push(u);
  }

  /**
   * 通過したノード
   * @type {Record<number, boolean>}
   */
  const passMap = {};
  let circularCount = 0;
  /**
   * @param {number} node - 現在のノード
   */
  const dfs = (node) => {
    const toList = edgesMap[node] ?? [];
    for (const to of toList) {
      if (passMap[to]) {
        circularCount += 1;
        continue;
      }
      passMap[to] = true;
      dfs(to);
    }
  };

  const startNode = Number(Object.keys(edgesMap)[0]);
  // そもそも開始するノードがない場合は0を返す
  if (Number.isNaN(startNode)) {
    console.log(0);
    return;
  }

  passMap[startNode] = true;
  dfs(startNode);

  // 回答
  console.log(circularCount);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
