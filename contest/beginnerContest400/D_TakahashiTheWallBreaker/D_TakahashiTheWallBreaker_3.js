// @ts-check
/**
 * @see https://atcoder.jp/contests/abc400/tasks/abc400_d
 */

/**
 * 双方キューの実装
 * @template T
 * @see https://stackoverflow.com/a/60055110
 */
class Deque {
  /**
   * 最大の格納数
   * @type {number}
   */
  static MAX_ITEM = Math.floor(Number.MAX_SAFE_INTEGER / 2);

  /**
   * データマップ
   * @type {Record<number, T>}
   */
  _dataMap = {};
  /**
   * 先頭のインデックス
   * @type {number}
   */
  _frontIndex = 0;
  /**
   * 末尾のインデックス
   * @type {number}
   */
  _backIndex = 0;

  /**
   * 先頭の値
   * @returns {T | undefined}
   */
  get front() {
    return this._dataMap[this._frontIndex];
  }
  /**
   * 先頭に値を追加する
   * @param {T} value - 値
   */
  pushFront(value) {
    const nextFrontIndex =
      (this._frontIndex - 1 + Deque.MAX_ITEM) % Deque.MAX_ITEM;
    if (nextFrontIndex === this._backIndex) {
      throw new Error("Deque is full");
    }
    this._dataMap[nextFrontIndex] = value;
    this._frontIndex = nextFrontIndex;
  }
  /**
   * 先頭の値を取り出す
   * @returns {T | undefined}
   */
  popFront() {
    if (this._frontIndex === this._backIndex) {
      return undefined;
    }
    const value = this._dataMap[this._frontIndex];
    delete this._dataMap[this._frontIndex];
    this._frontIndex = (this._frontIndex + 1) % Deque.MAX_ITEM;
    return value;
  }

  /**
   * 末尾の値
   * @returns {T | undefined}
   */
  get back() {
    return this._dataMap[this._backIndex];
  }
  /**
   * 末尾に値を追加する
   * @param {T} value - 値
   */
  pushBack(value) {
    const nextBackIndex = (this._backIndex + 1) % Deque.MAX_ITEM;
    if (nextBackIndex === this._frontIndex) {
      throw new Error("Deque is full");
    }
    this._dataMap[this._backIndex] = value;
    this._backIndex = nextBackIndex;
  }
  /**
   * 末尾の値を取り出す
   * @returns {T | undefined}
   */
  popBack() {
    if (this._frontIndex === this._backIndex) {
      return undefined;
    }
    const value = this._dataMap[this._backIndex];
    delete this._dataMap[this._backIndex];
    this._backIndex = (this._backIndex - 1 + Deque.MAX_ITEM) % Deque.MAX_ITEM;
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
