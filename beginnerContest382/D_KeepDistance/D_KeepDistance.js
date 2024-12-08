/**
 * @see https://atcoder.jp/contests/abc382/tasks/abc382_d
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, M] = inputList[0].split(" ").map(Number);

  const seqList = [];
  const genSeqList = (lastValue, currentSeq) => {
    const level = currentSeq.length + 1;
    for (
      let nextValue = lastValue + 10;
      nextValue <= M - 10 * (N - level);
      nextValue++
    ) {
      const nextSeq = [...currentSeq, nextValue];
      if (nextSeq.length >= N) {
        seqList.push(nextSeq);
      } else {
        genSeqList(nextValue, nextSeq);
      }
    }
  };

  for (let i = 1; i <= M - 10 * (N - 1); i++) {
    genSeqList(i, [i]);
  }

  // 回答
  console.log(seqList.length);
  seqList.forEach((seq) => {
    console.log(seq.join(" "));
  });
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
