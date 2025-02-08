/**
 * @see https://atcoder.jp/contests/abc384/tasks/abc384_d
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N_Str, S_Str] = inputList[0].split(" ");
  const N = Number(N_Str);
  const S = BigInt(S_Str);
  const values = inputList[1].split(" ").map(Number);

  const total = values.reduce((acc, cur) => acc + cur, 0);
  const rest_bigint = S % BigInt(total);
  const rest = Number(rest_bigint);

  // 尺取法で解く
  // @see https://qiita.com/drken/items/ecd1a472d3a0e7db8dce
  // @see https://na.fuis.u-fukui.ac.jp/~hirota/course/2022_Exp2_Programming/03-1_Shakutori.pdf
  let isExist = false;
  let startIndex = 0;
  let endIndex = 0;
  let sum = 0;
  while (true) {
    if (sum === rest) {
      isExist = true;
      break;
    }
    if (sum < rest) {
      // 部分数列の範囲は前後を考慮して2 * Nまでチェックする
      if (endIndex >= 2 * N) {
        break;
      }
      sum += values[endIndex % N];
      endIndex++;
      continue;
    }
    if (sum > rest) {
      if (startIndex >= 2 * N) {
        break;
      }
      sum -= values[startIndex % N];
      startIndex++;
      continue;
    }
  }

  // 回答
  console.log(isExist ? "Yes" : "No");
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
