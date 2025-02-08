/**
 * @see https://atcoder.jp/contests/abc382/tasks/abc382_c
 */

function Main(input) {
  input = input.split("\n");
  const [N, M] = input[0].split(" ").map(Number);
  const rankPeople = input[1].split(" ").map(Number);
  const rankSushiList = input[2].split(" ").map(Number);

  // 回答
  rankSushiList.forEach((sushi) => {
    for (let i = 0; i < rankPeople.length; i++) {
      if (rankPeople[i] <= sushi) {
        console.log(i + 1);
        return;
      }
    }
    // 誰も選ばれなかったら-1を出力
    console.log(-1);
  });
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
