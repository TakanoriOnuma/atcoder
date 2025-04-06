// @ts-check
/**
 * @see https://atcoder.jp/contests/abc400/tasks/abc400_d
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
  const [H, W] = inputList[0].split(" ").map(Number);
  const map = inputList.slice(1, H + 1);
  const [startY, startX, endY, endX] = inputList[H + 1]
    .split(" ")
    .map((val) => Number(val) - 1);

  /**
   * 優先度付きキュー
   * @type {Heap<{ x: number; y: number; cost: number }>}
   */
  const priorityQueue = new Heap((a, b) => a.cost - b.cost);
  priorityQueue.push({ x: startX, y: startY, cost: 0 });

  /**
   * 訪問済みマップ
   * @type {boolean[][]}
   */
  const visited = Array.from({ length: H }, () => Array(W).fill(false));

  /** 移動方向 */
  const vectorPatterns = [
    { x: -1, y: 0 }, // 左
    { x: 0, y: -1 }, // 上
    { x: 1, y: 0 }, // 右
    { x: 0, y: 1 }, // 下
  ];

  /**
   * マップ内にいるか
   * @param {{ x: number; y: number }} pos - 座標
   */
  const isContainMap = (pos) => {
    if (pos.x < 0 || pos.x >= W || pos.y < 0 || pos.y >= H) {
      return false;
    }
    return true;
  };

  while (true) {
    const queue = priorityQueue.pop();
    if (queue == null) {
      break;
    }

    if (queue.x === endX && queue.y === endY) {
      console.log(queue.cost);
      return;
    }
    if (visited[queue.y][queue.x]) {
      continue;
    }
    visited[queue.y][queue.x] = true;

    for (const vector of vectorPatterns) {
      const pos = { x: queue.x + vector.x, y: queue.y + vector.y };
      if (!isContainMap(pos)) {
        continue;
      }
      if (visited[pos.y][pos.x]) {
        continue;
      }

      if (map[pos.y][pos.x] === ".") {
        priorityQueue.push({ ...pos, cost: queue.cost });
      } else {
        priorityQueue.push({ ...pos, cost: queue.cost + 1 });
        const pos2 = { x: pos.x + vector.x, y: pos.y + vector.y };
        if (isContainMap(pos2)) {
          priorityQueue.push({ ...pos2, cost: queue.cost + 1 });
        }
      }
    }
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
