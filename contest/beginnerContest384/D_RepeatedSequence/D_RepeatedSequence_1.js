/**
 * @see https://atcoder.jp/contests/abc384/tasks/abc384_d
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, S] = inputList[0].split(" ").map(Number);
  const values = inputList[1].split(" ").map(Number);

  let total = values.reduce((acc, cur) => acc + cur, 0);
  let rest = S % total;
  console.log(total, rest);

  let isExist = false;
  if (rest === 0) {
    isExist = true;
  } else {
    let sum_left = 0;
    let sum_right = 0;

    for (let i = 0; i < N; i++) {
      sum_left += values[i];
      sum_right += values[N - i - 1];
      console.log(sum_left, sum_right);

      if (sum_left === rest || sum_right === rest) {
        isExist = true;
        break;
      }
      if (sum_left > rest && sum_right > rest) {
        break;
      }
    }
  }

  // 回答
  console.log(isExist ? "Yes" : "No");
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
