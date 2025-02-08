/**
 * @see https://atcoder.jp/contests/abc388/tasks/abc388_d
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = Number(inputList[0]);
  const A_List = inputList[1].split(" ").map(Number);

  const decIndexMap = {};
  /** 他の宇宙人から受け取れる数 */
  let acc = 0;
  for (let i = 0; i < N; i++) {
    const value = A_List[i] + acc;
    if (decIndexMap[i + value] == null) {
      decIndexMap[i + value] = 0;
    }
    decIndexMap[i + value] += 1;

    const finalValue = Math.max(value - (N - i - 1), 0);
    process.stdout.write(finalValue + " ");
    acc += 1;
    if (decIndexMap[i] != null) {
      acc -= decIndexMap[i];
    }
  }

  // 回答
  console.log();
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
