/**
 * @see https://atcoder.jp/contests/abc394/tasks/abc394_d
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const S = inputList[0];

  let stackIndex = -1;
  const stack = new Array(S.length);

  for (let i = 0; i < S.length; i++) {
    const char = S[i];

    switch (char) {
      case "(":
      case "[":
      case "<":
        stackIndex += 1;
        stack[stackIndex] = char;
        break;
      case ")":
        if (stack[stackIndex] === "(") {
          stackIndex -= 1;
        } else {
          console.log("No");
          return;
        }
        break;
      case "]":
        if (stack[stackIndex] === "[") {
          stackIndex -= 1;
        } else {
          console.log("No");
          return;
        }
        break;
      case ">":
        if (stack[stackIndex] === "<") {
          stackIndex -= 1;
        } else {
          console.log("No");
          return;
        }
        break;
    }
  }

  // 回答
  console.log(stackIndex === -1 ? "Yes" : "No");
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
