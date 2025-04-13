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

  const chars = new Array(N).fill("");

  for (let i = 0; i < N; i++) {
    const char = S[i];
    chars[i] = char;
    if (char === "o") {
      if (i > 0 && chars[i - 1] === "?") {
        chars[i - 1] = ".";
      }
      if (i < N - 1 && S[i + 1] === "?") {
        chars[i + 1] = ".";
        i += 1;
      }
    }
  }

  /**
   * 各記号の数
   */
  const symbolCountMap = { ".": 0, o: 0, "?": 0 };
  /**
   * ?の繰り返しの数をindexで管理
   * @type {Record<number, number>}
   */
  const questionRepeatMap = {};
  let startQuestionIndex = -1;
  for (let i = 0; i < N; i++) {
    const char = chars[i];
    symbolCountMap[char] += 1;

    if (startQuestionIndex === -1) {
      if (char === "?") {
        startQuestionIndex = i;
      }
    } else if (char !== "?") {
      const questionCount = i - startQuestionIndex;
      questionRepeatMap[startQuestionIndex] = questionCount;
      startQuestionIndex = -1;
    }
  }
  if (startQuestionIndex !== -1) {
    const questionCount = N - startQuestionIndex;
    questionRepeatMap[startQuestionIndex] = questionCount;
  }

  const remainO = K - symbolCountMap["o"];
  // oの数が既にK個ある場合は、?は.で確定する
  if (remainO === 0) {
    for (let i = 0; i < N; i++) {
      const char = chars[i];
      process.stdout.write(char === "?" ? "." : char);
    }
    console.log();
    return;
  }

  /** oに変えられる最大値 */
  const availableO = Object.values(questionRepeatMap).reduce((acc, value) => {
    return acc + Math.ceil(value / 2);
  }, 0);

  // 残りのoよりも変更できる数が多い場合は確定できないので、今のまま出力
  if (availableO > remainO) {
    for (let i = 0; i < N; i++) {
      process.stdout.write(chars[i]);
    }
    console.log();
    return;
  }

  // それ以外のケース
  for (let i = 0; i < N; i++) {
    const questionRepeat = questionRepeatMap[i];
    if (questionRepeat == null) {
      process.stdout.write(chars[i]);
      continue;
    }

    // 偶数の場合は.o.oとo.o.で確定できないので?で出力する
    if (questionRepeat % 2 === 0) {
      process.stdout.write("?".repeat(questionRepeat));
      i += questionRepeat - 1;
    } else {
      // 奇数の場合はo.o.oと一意き決まるので、それを出力する
      process.stdout.write("o.".repeat(Math.floor(questionRepeat / 2)));
      process.stdout.write("o");
      i += questionRepeat - 1;
    }
  }
  console.log();
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
