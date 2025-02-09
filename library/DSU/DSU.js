/**
 * Disjoint Set Union, 素集合データ構造
 * @see https://qiita.com/AkariLuminous/items/93b8f13e0d33da4ac331
 * @see https://github.com/atcoder/ac-library/blob/v1.5.1/atcoder/dsu.hpp
 */
class DSU {
  /**
   * 要素数
   * @type {number}
   */
  _n;
  /**
   * グループの親要素またはグループのサイズ。正の値が親を指しており、負の値が自分が親でかつグループのサイズを表す。
   * @type {number[]}
   */
  _parentOrSize;

  /**
   * @param {number} n - 要素数
   */
  constructor(n) {
    this._n = n;
    this._parentOrSize = Array.from({ length: n }, () => -1);
  }

  /**
   * その要素が属するリーダーを返す
   * @param {number} a - 要素
   * @returns
   */
  leader(a) {
    if (this._parentOrSize[a] < 0) {
      return a;
    }
    this._parentOrSize[a] = this.leader(this._parentOrSize[a]);
    return this._parentOrSize[a];
  }

  /**
   * aとbを同じグループにする
   * @param {number} a - 要素
   * @param {number} b - 要素
   */
  merge(a, b) {
    let x = this.leader(a);
    let y = this.leader(b);
    if (x === y) {
      return x;
    }
    if (-this._parentOrSize[x] < -this._parentOrSize[y]) {
      [x, y] = [y, x];
    }
    this._parentOrSize[x] += this._parentOrSize[y];
    this._parentOrSize[y] = x;
    return x;
  }

  /**
   * aとbが同じグループに属するかどうか
   * @param {number} a - 要素
   * @param {number} b - 要素
   * @returns {boolean}
   */
  same(a, b) {
    return this.leader(a) === this.leader(b);
  }

  /**
   * その要素が属するグループのサイズを返す
   * @param {number} a - 要素
   * @returns {number}
   */
  size(a) {
    return -this._parentOrSize[this.leader(a)];
  }

  /**
   * グループごとのリストを返す
   * @returns {number[][]}
   */
  groups() {
    const leaderBuf = Array.from({ length: this._n }, (_, i) => this.leader(i));
    /** @type {Record<string, number[]>} */
    const groupMap = {};
    for (let i = 0; i < this._n; i++) {
      const leader = leaderBuf[i];
      if (groupMap[leader] == null) {
        groupMap[leader] = [];
      }
      groupMap[leader].push(i);
    }
    return Object.values(groupMap);
  }
}

module.exports = DSU;
