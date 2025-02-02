/**
 * @see https://atcoder.jp/contests/abc391/tasks/abc391_c
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, Q] = inputList[0].split(" ").map(Number);

  const birdMap = {};
  const nestCountMap = {};
  let numMultipleNest = 0;

  for (let i = 0; i < Q; i++) {
    const [operator, P, H] = inputList[i + 1].split(" ").map(Number);
    switch (operator) {
      case 1: {
        // 今の場所から抜ける
        const currentBirdPos = birdMap[P] ?? P;
        nestCountMap[currentBirdPos] = (nestCountMap[currentBirdPos] ?? 1) - 1;
        if (nestCountMap[currentBirdPos] === 1) {
          numMultipleNest--;
        }
        // 移動先に入る
        nestCountMap[H] = (nestCountMap[H] ?? 1) + 1;
        if (nestCountMap[H] === 2) {
          numMultipleNest++;
        }
        birdMap[P] = H;
        break;
      }
      case 2:
        console.log(numMultipleNest);
        break;
    }
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
