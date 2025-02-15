/**
 * @see https://atcoder.jp/contests/abc393/tasks/abc393_c
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, M] = inputList[0].split(" ").map(Number);

  /**
   * 辺のマップ
   * @type {Record<string, boolean>}
   */
  const edgedMap = {};

  let count = 0;
  for (let i = 0; i < M; i++) {
    const [u, v] = inputList[i + 1].split(" ").map(Number);
    if (u === v) {
      count += 1;
      continue;
    }

    const [p1, p2] = [u, v].sort();
    const key = `${p1}-${p2}`;
    if (key in edgedMap) {
      count += 1;
      continue;
    }

    edgedMap[key] = true;
  }

  // 回答
  console.log(count);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
