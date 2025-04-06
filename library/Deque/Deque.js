// @ts-check

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

module.exports = Deque;
