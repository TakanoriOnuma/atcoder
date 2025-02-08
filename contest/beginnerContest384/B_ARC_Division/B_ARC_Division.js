/**
 * @see https://atcoder.jp/contests/abc384/tasks/abc384_b
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, R] = inputList[0].split(" ").map(Number);

  let rate = R;
  for (let i = 0; i < N; i++) {
    const [D, A] = inputList[i + 1].split(" ").map(Number);

    switch (D) {
      case 1: {
        if (rate >= 1600 && rate <= 2799) {
          rate += A;
        }
        break;
      }
      case 2: {
        if (rate >= 1200 && rate <= 2399) {
          rate += A;
        }
        break;
      }
    }
  }

  // 回答
  console.log(rate);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
