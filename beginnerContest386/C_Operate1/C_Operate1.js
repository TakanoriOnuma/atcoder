/**
 * @see https://atcoder.jp/contests/abc386/tasks/abc386_c
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [K] = inputList[0].split(" ").map(Number);
  const S = inputList[1];
  const T = inputList[2];

  if (S === T) {
    console.log("Yes");
    return;
  }

  // S中の任意の位置に、任意の文字を挿入して一致できるか
  if (S.length + 1 === T.length) {
    let cursor = 0;
    // 前から完全一致する位置までカーソルを進める
    while (cursor < S.length) {
      if (S[cursor] !== T[cursor]) {
        break;
      }
      cursor += 1;
    }
    if (cursor === S.length) {
      console.log("Yes");
      return;
    }

    // 1文字ずらして一致するか
    while (cursor < S.length) {
      if (S[cursor] !== T[cursor + 1]) {
        break;
      }
      cursor += 1;
    }
    if (cursor === S.length) {
      console.log("Yes");
      return;
    }
  }

  // S中の文字を一つ削除することで一致できるか
  if (S.length - 1 === T.length) {
    let cursor = 0;
    // 前から完全一致する位置までカーソルを進める
    while (cursor < S.length) {
      if (S[cursor] !== T[cursor]) {
        break;
      }
      cursor += 1;
    }
    if (cursor === S.length) {
      console.log("Yes");
      return;
    }

    // 削除予定の1文字ずらす
    cursor += 1;

    // 1文字ずらして一致するか
    while (cursor < S.length) {
      if (S[cursor] !== T[cursor - 1]) {
        break;
      }
      cursor += 1;
    }
    if (cursor === S.length) {
      console.log("Yes");
      return;
    }
  }

  // S中の文字を一つ変えることで一致できるか
  if (S.length === T.length) {
    let cursor = 0;
    // 前から完全一致する位置までカーソルを進める
    while (cursor < S.length) {
      if (S[cursor] !== T[cursor]) {
        break;
      }
      cursor += 1;
    }
    if (cursor === S.length) {
      console.log("Yes");
      return;
    }

    // 変更予定の1文字ずらす
    cursor += 1;

    // それ以降の文字は一致するか
    while (cursor < S.length) {
      if (S[cursor] !== T[cursor]) {
        break;
      }
      cursor += 1;
    }
    if (cursor === S.length) {
      console.log("Yes");
      return;
    }
  }

  // 回答
  console.log("No");
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
