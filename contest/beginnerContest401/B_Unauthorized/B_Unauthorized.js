// @ts-check
/**
 * @see https://atcoder.jp/contests/abc401/tasks/abc401_b
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const N = Number(inputList[0]);

  /**
   * ログイン状態
   * @type {'login' | 'logout'}
   */
  let status = "logout";

  let countError = 0;
  for (let i = 0; i < N; i++) {
    const S = inputList[i + 1];

    switch (S) {
      case "login":
      case "logout":
        status = S;
        break;
      case "public":
        break;
      case "private":
        if (status === "logout") {
          countError += 1;
        }
        break;
    }
  }

  // 回答
  console.log(countError);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
