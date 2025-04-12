// @ts-check
/**
 * @see https://atcoder.jp/contests/abc401/tasks/abc401_d
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, K] = inputList[0].split(" ").map(Number);
  const S = inputList[1];

  /**
   * 各記号の数
   */
  const symbolCountMap = { ".": 0, o: 0, "?": 0 };
  const chars = new Array(N).fill("");

  for (let i = 0; i < N; i++) {
    const char = S[i];
    symbolCountMap[char] += 1;
    chars[i] = char;
    if (char === "o") {
      if (i > 0 && chars[i - 1] === "?") {
        symbolCountMap["?"] -= 1;
        symbolCountMap["."] += 1;
        chars[i - 1] = ".";
      }
      if (i < N - 1 && S[i + 1] === "?") {
        symbolCountMap["."] += 1;
        chars[i + 1] = ".";
        i += 1;
      }
    }
  }

  const remainO = K - symbolCountMap["o"];
  const isFixed = symbolCountMap["?"] === Math.floor(remainO * 1.5);

  // 固定できない場合はcharsをそのまま出力
  if (!isFixed) {
    for (let i = 0; i < N; i++) {
      process.stdout.write(chars[i]);
    }
    console.log();
    return;
  }

  // 固定できる場合は、?をoか.で表示する
  for (let i = 0; i < N; i++) {
    const char = chars[i];
    if (char !== "?") {
      process.stdout.write(char);
      continue;
    }
    if (i <= 0) {
      process.stdout.write("o");
      chars[i] = "o";
      continue;
    }
    if (chars[i - 1] === "o") {
      process.stdout.write(".");
      chars[i] = ".";
    } else {
      process.stdout.write("o");
      chars[i] = "o";
    }
  }
  console.log();
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
