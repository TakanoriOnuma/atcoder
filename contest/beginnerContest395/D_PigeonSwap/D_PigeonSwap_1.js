/**
 * @see https://atcoder.jp/contests/abc395/tasks/abc395_d
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, Q] = inputList[0].split(" ").map(Number);

  /**
   * 各鳩がどの巣にいるか
   * @type {Record<number, number>}
   */
  const pigeonMap = {};
  /**
   * 各巣がどの鳩を持っているか
   * @type {Record<number, number[]>}
   */
  const nestsMap = {};

  for (let i = 1; i <= N; i++) {
    pigeonMap[i] = i;
    nestsMap[i] = [i];
  }

  for (let i = 0; i < Q; i++) {
    const [op, a, b] = inputList[i + 1].split(" ").map(Number);

    switch (op) {
      case 1: {
        if (a !== b) {
          pigeonMap[a] = b;
          nestsMap[b].push(a);
          nestsMap[a] = nestsMap[a].filter((n) => n !== a);
        }
        break;
      }
      case 2: {
        const aNests = nestsMap[a];
        const bNests = nestsMap[b];
        for (const p of aNests) {
          pigeonMap[p] = b;
        }
        for (const p of bNests) {
          pigeonMap[p] = a;
        }
        nestsMap[a] = bNests;
        nestsMap[b] = aNests;
        break;
      }
      case 3: {
        console.log(pigeonMap[a]);
        break;
      }
    }
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
