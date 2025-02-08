/**
 * @see https://atcoder.jp/contests/abc392/tasks/abc392_c
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N] = inputList[0].split(" ").map(Number);
  const P_List = inputList[1].split(" ").map(Number);
  const Q_List = inputList[2].split(" ").map(Number);

  const people = Array.from({ length: N }, (_, i) => ({
    p: P_List[i],
    q: Q_List[i],
  }));
  people.sort((person1, person2) => person1.q - person2.q);

  const ansList = people.map((person) => Q_List[person.p - 1]);

  // 回答
  console.log(ansList.join(" "));
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
