// @ts-check
/**
 * @see https://atcoder.jp/contests/abc400/tasks/abc400_d
 */

/**
 * 双方向リストの要素
 * @template T
 */
class LinkedItem {
  /**
   * 値
   * @type {T}
   */
  value;
  /**
   * 前の要素
   * @type {LinkedItem<T> | undefined}
   */
  prev;
  /**
   * 次の要素
   * @type {LinkedItem<T> | undefined}
   */
  next;

  /**
   * @param {T} value - 値
   */
  constructor(value) {
    this.value = value;
  }
}

/**
 * 双方向キューを双方向リストで実装
 * @template T
 * @see https://stackoverflow.com/a/60055110
 */
class Deque {
  /**
   * 先頭の要素
   * @type {LinkedItem<T> | undefined}
   */
  _front;
  /**
   * 末尾の要素
   * @type {LinkedItem<T> | undefined}
   */
  _back;

  /** 先頭の値 */
  get front() {
    return this._front?.value;
  }
  /**
   * 先頭に値を追加する
   * @param {T} value - 値
   */
  pushFront(value) {
    const item = new LinkedItem(value);
    if (this._front) {
      item.next = this._front;
      this._front.prev = item;
    }
    this._front = item;
    if (!this._back) {
      this._back = item;
    }
  }
  /**
   * 先頭の値を取り出す
   * @returns {T | undefined}
   */
  popFront() {
    if (!this._front) {
      return undefined;
    }
    const value = this._front.value;
    this._front = this._front.next;
    if (this._front) {
      this._front.prev = undefined;
    } else {
      this._back = undefined;
    }
    return value;
  }

  /** 末尾の値 */
  get back() {
    return this._back?.value;
  }
  /**
   * 末尾に値を追加する
   * @param {T} value - 値
   */
  pushBack(value) {
    const item = new LinkedItem(value);
    if (this._back) {
      item.prev = this._back;
      this._back.next = item;
    }
    this._back = item;
    if (!this._front) {
      this._front = item;
    }
  }
  /**
   * 末尾の値を取り出す
   * @returns {T | undefined}
   */
  popBack() {
    if (!this._back) {
      return undefined;
    }
    const value = this._back.value;
    this._back = this._back.prev;
    if (this._back) {
      this._back.next = undefined;
    } else {
      this._front = undefined;
    }
    return value;
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
   * @type {Deque<{ x: number; y: number; cost: number }>}
   */
  const deque = new Deque();
  deque.pushFront({ x: startX, y: startY, cost: 0 });

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
    const queue = deque.popFront();
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
        deque.pushFront({ ...pos, cost: queue.cost });
      } else {
        deque.pushBack({ ...pos, cost: queue.cost + 1 });
        const pos2 = { x: pos.x + vector.x, y: pos.y + vector.y };
        if (isContainMap(pos2)) {
          deque.pushBack({ ...pos2, cost: queue.cost + 1 });
        }
      }
    }
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
