/**
 * @see https://atcoder.jp/contests/abc390/tasks/abc390_a
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const values = inputList[0].split(" ").map(Number);

  const otherValueIndexes = [];
  for (let i = 0; i < values.length; i++) {
    if (values[i] === i + 1) {
      continue;
    }
    otherValueIndexes.push(i);
  }

  // 回答
  if (otherValueIndexes.length !== 2) {
    console.log("No");
  } else {
    const [index1, index2] = otherValueIndexes;
    if (index2 - index1 === 1) {
      console.log("Yes");
    } else {
      console.log("No");
    }
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
