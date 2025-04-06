// @ts-check

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

module.exports = Deque;
