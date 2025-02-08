/**
 * @see https://atcoder.jp/contests/abc386/tasks/abc386_a
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const cards = inputList[0].split(" ").map(Number);

  const countMap = {};
  cards.forEach((card) => {
    if (countMap[card]) {
      countMap[card] += 1;
    } else {
      countMap[card] = 1;
    }
  });

  const countList = Object.values(countMap);

  if (countList.includes(3)) {
    console.log("Yes");
    return;
  }
  if (countList[0] === 2 && countList[1] === 2) {
    console.log("Yes");
    return;
  }

  // 回答
  console.log("No");
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
