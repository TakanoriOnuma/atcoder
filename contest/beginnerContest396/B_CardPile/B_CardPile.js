// @ts-check
/**
 * @see https://atcoder.jp/contests/abc396/tasks/abc396_b
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const Q = Number(inputList[0]);

  const cards = new Array(100).fill(0);
  for (let i = 0; i < Q; i++) {
    const [query, x] = inputList[i + 1].split(" ").map(Number);
    switch (query) {
      case 1:
        cards.push(x);
        break;
      case 2: {
        const value = cards.pop();
        console.log(value);
        break;
      }
    }
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
