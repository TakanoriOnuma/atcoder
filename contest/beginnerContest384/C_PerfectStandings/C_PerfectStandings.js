/**
 * @see https://atcoder.jp/contests/abc384/tasks/abc384_c
 */

// NOTE: 組み合わせの出し方もっと良いやり方あると思う
const combinationList = (str = "", rest = ["A", "B", "C", "D", "E"]) => {
  const [first, ...omittedFirstRest] = rest;
  const joinedStr = str + first;

  /** @type {string[]} */
  const list = [];

  if (omittedFirstRest.length > 0) {
    list.push(...combinationList(str, omittedFirstRest));
    list.push(...combinationList(joinedStr, omittedFirstRest));
  } else {
    if (str.length >= 1) {
      list.push(str);
    }
    list.push(joinedStr);
  }
  return list;
};

const combinationList2 = (pattern = ["A", "B", "C", "D", "E"]) => {
  /** @type {string[]} */
  const list = [];

  const addCombinations = (str = "", pattern = ["A", "B", "C", "D", "E"]) => {
    const [first, ...restPattern] = pattern;
    const joinedStr = str + first;

    if (restPattern.length <= 0) {
      if (str !== "") {
        list.push(str);
      }
      list.push(joinedStr);
    } else {
      addCombinations(str, restPattern);
      addCombinations(joinedStr, restPattern);
    }
  };

  addCombinations("", pattern);
  return list;
};

const combinationList3 = (pattern = ["A", "B", "C", "D", "E"]) => {
  const digits = pattern.length;
  const max = 2 ** digits - 1;

  return Array.from({ length: max }, (_, i) => {
    const value = i + 1;
    let str = "";
    for (let digit = 0; digit < digits; digit++) {
      const mask = 1 << digit;
      str += value & mask ? pattern[digit] : "";
    }
    return str;
  });
};

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [A, B, C, D, E] = inputList[0].split(" ").map(Number);
  const SCORE_MAP = {
    A,
    B,
    C,
    D,
    E,
  };

  const list = combinationList3();
  list.sort().reverse();

  const listWithScore = list.map((str) => {
    return {
      str,
      score: str.split("").reduce((acc, cur) => acc + SCORE_MAP[cur], 0),
    };
  });
  listWithScore.sort((a, b) => a.score - b.score).reverse();

  // 回答
  listWithScore.forEach((item) => {
    console.log(item.str);
  });
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
