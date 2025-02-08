/**
 * @see https://atcoder.jp/contests/abc382/tasks/abc382_b
 */

function Main(input) {
  input = input.split("\n");
  const [N, D] = input[0].split(" ").map(Number);
  const S = String(input[1]);

  const boxes = S.split("");
  for (let i = 0; i < D; i++) {
    const lastCookieIndex = boxes.lastIndexOf("@");
    if (lastCookieIndex >= 0) {
      boxes[lastCookieIndex] = ".";
    }
  }

  // 回答
  console.log(boxes.join(""));
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
