/**
 * @see https://atcoder.jp/contests/abc393/tasks/abc393_e
 */

const DEBUG = false;

const GCD_RESULT_MAP = {};
/**
 * GCDを求める
 * @param {number} a
 * @param {number} b
 */
const gcd = (a, b) => {
  if (a < b) {
    [a, b] = [b, a];
  }
  if (b === 0) {
    return a;
  }
  if (GCD_RESULT_MAP[`${a}-${b}`]) {
    return GCD_RESULT_MAP[`${a}-${b}`];
  }
  const result = gcd(b, a % b);
  GCD_RESULT_MAP[`${a}-${b}`] = result;
  return result;
};

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  DEBUG && console.time("Main");

  const inputList = input.split("\n");
  const [N, K] = inputList[0].split(" ").map(Number);
  const A_List = inputList[1].split(" ").map(Number);

  for (let i = 0; i < N; i++) {
    const GCD_List = A_List.map((a) => {
      return {
        gcd: gcd(a, A_List[i]),
        value: a,
      };
    });

    // GCDが高い順にK個ピックアップして、その中で最大のGCDを求める
    GCD_List.sort((a, b) => b.gcd - a.gcd);
    // console.log(GCD_List);

    let result = GCD_List[0].gcd;
    for (let j = 1; j < K; j++) {
      result = gcd(result, GCD_List[j].value);
    }
    console.log(result);
  }

  DEBUG && console.timeEnd("Main");
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
