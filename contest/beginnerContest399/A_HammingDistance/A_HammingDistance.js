// @ts-check
/**
 * @see https://atcoder.jp/contests/abc399/tasks/abc399_a
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const Str_1 = inputList[1];
  const Str_2 = inputList[2];

  let hammingDistance = 0;
  for (let i = 0; i < Str_1.length; i++) {
    if (Str_1[i] !== Str_2[i]) {
      hammingDistance++;
    }
  }

  // 回答
  console.log(hammingDistance);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
