/**
 * @see https://atcoder.jp/contests/abc389/tasks/abc389_d
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const R = Number(inputList[0]);

  const circleDistance = R ** 2;
  const offset = 0.5;
  let numBlock_X = R - 1;
  let total = 0;
  for (let i_y = 0; i_y < R; i_y++) {
    while (numBlock_X > 0) {
      const blockDistance = (numBlock_X + offset) ** 2 + (i_y + offset) ** 2;
      if (blockDistance < circleDistance) {
        break;
      }
      numBlock_X -= 1;
    }
    total += numBlock_X;
  }

  // 回答
  console.log(total * 4 + 1);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
