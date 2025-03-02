// @ts-check
/**
 * @see https://atcoder.jp/contests/abc395/tasks/abc395_e
 */

/**
 * ヒープ構造
 * @template T
 */
class Heap {
  /**
   * ヒープデータ
   * @type {T[]}
   */
  _arr;
  /**
   * 比較関数
   * @type {(a: T, b: T) => number}
   */
  _compare;

  /**
   * @param {(a: T, b: T) => number} compare - 比較関数
   */
  constructor(compare) {
    this._arr = [];
    this._compare = compare;
  }

  /**
   * 個数を返す
   * @returns {number}
   */
  getSize() {
    return this._arr.length;
  }

  /**
   * 一番上の値(最小値)を取得する
   * @returns {T | undefined}
   */
  getTop() {
    return this._arr[0];
  }

  /**
   * 値を追加する
   * @param {T} value - 追加する値
   */
  push(value) {
    // 末尾に追加する
    this._arr.push(value);
    let i = this._arr.length - 1;

    // 追加する値が親より小さくない状況になるまで上に移動する
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this._compare(this._arr[p], value) <= 0) {
        break;
      }
      this._arr[i] = this._arr[p];
      i = p;
    }

    // 空白になった場所に値を入れる
    this._arr[i] = value;
  }

  /**
   * 最小値を取り出す
   * @returns {T | undefined}
   */
  pop() {
    // 一番上の値の取得と末尾の値を取り出しを行う
    const res = this._arr[0];
    const poppedValue = this._arr.pop();
    // そもそも取り出せるものがなければundefinedを返す
    if (poppedValue == null) {
      return undefined;
    }
    // 取り出したら空になる場合はデータを整理する必要がないので、取得した値を返して終了
    if (this._arr.length === 0) {
      return res;
    }

    // 一番上が欠番になったので、末尾の値を一番上から下に移動する
    let i = 0;
    while (i * 2 + 1 < this._arr.length) {
      let child1 = i * 2 + 1;
      let child2 = i * 2 + 2;
      // 子供は2つあるので、より小さいほうを選ぶ
      if (
        child2 < this._arr.length &&
        this._compare(this._arr[child2], this._arr[child1]) < 0
      ) {
        child1 = child2;
      }
      // 選ばれた子供の方が親より大きい場合は終了
      if (this._compare(this._arr[child1], poppedValue) >= 0) {
        break;
      }
      // 親より小さかった場合は子供を上に移動する
      this._arr[i] = this._arr[child1];
      i = child1;
    }

    // 空白になった場所に取り出した値を入れる
    this._arr[i] = poppedValue;
    return res;
  }
}

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, M, X] = inputList[0].split(" ").map(Number);

  /**
   * 重み付き方向リスト
   * @type {Record<number, { to: number; weight: number }[]>}
   */
  const dirsMap = {};

  // 元のグラフとの反転に対応する辺
  for (let i = 0; i < N; i++) {
    dirsMap[i + 1] = [{ to: i + N + 1, weight: X }];
    dirsMap[i + N + 1] = [{ to: i + 1, weight: X }];
  }

  // 辺を作成
  for (let i = 0; i < M; i++) {
    const [u, v] = inputList[i + 1].split(" ").map(Number);
    dirsMap[u].push({ to: v, weight: 1 });
    dirsMap[v + N].push({ to: u + N, weight: 1 });
  }

  /**
   * 優先度付きキュー
   * @type {Heap<{ node: number; cost: number;  }>}
   */
  const priorityQueue = new Heap((a, b) => a.cost - b.cost);
  priorityQueue.push({ node: 1, cost: 0 });

  const costs = new Array(2 * N + 1).fill(Number.MAX_SAFE_INTEGER);
  costs[1] = 0;

  while (true) {
    const queue = priorityQueue.pop();
    if (queue == null) {
      break;
    }

    for (const dir of dirsMap[queue.node]) {
      const cost = costs[queue.node] + dir.weight;
      if (cost < costs[dir.to]) {
        costs[dir.to] = cost;
        priorityQueue.push({ node: dir.to, cost });
      }
    }
  }

  // 回答
  const result = Math.min(costs[N], costs[2 * N]);
  console.log(result);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
