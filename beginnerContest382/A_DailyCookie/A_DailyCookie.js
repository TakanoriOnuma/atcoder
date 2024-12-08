/**
 * @see https://atcoder.jp/contests/abc382/tasks/abc382_a
 */

function Main(input) {
  input = input.split("\n");
  const [N, D] = input[0].split(" ").map(Number);
  const S = input[1];

  const boxes = S.split("");
  const numCookie = boxes.filter((box) => box === "@").length;
  const numEmpty = boxes.filter((box) => box === ".").length;

  /** クッキーを食べる個数 */
  const numEatCookie = Math.min(D, numCookie);

  // 回答
  console.log(numEmpty + numEatCookie);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
