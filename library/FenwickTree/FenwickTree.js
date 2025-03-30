// @ts-check

/**
 * フェニックツリー
 * @see https://qiita.com/AkariLuminous/items/f2f7930e7f67963f0493
 * @see https://github.com/atcoder/ac-library/blob/v1.5.1/atcoder/fenwicktree.hpp
 */
class FenwickTree {
  /**
   * 要素数
   * @type {number}
   */
  _n;
  /**
   * データ
   * @type {number[]}
   */
  _data;

  /**
   * @param {number} n - 要素数
   */
  constructor(n) {
    this._n = n;
    this._data = Array.from({ length: n }, () => 0);
  }

  /**
   * 指定したindexに値を加算する
   * @param {number} p - 加算するindex値
   * @param {number} x - 加算する値
   */
  add(p, x) {
    if (p < 0 || p >= this._n) {
      throw new Error("Index out of range");
    }
    p++;
    while (p <= this._n) {
      this._data[p - 1] += x;
      p += p & -p;
    }
  }

  /**
   * 0~rまでの累積和を求める
   * @param {number} r - 累積和を求める範囲
   */
  _sum(r) {
    let s = 0;
    while (r > 0) {
      s += this._data[r - 1];
      r -= r & -r;
    }
    return s;
  }

  /**
   * l~rまでの累積和を求める
   * @param {number} l - 開始index
   * @param {number} r - 終了index
   */
  sum(l, r) {
    if (l < 0 || r < l || r > this._n) {
      throw new Error("Index out of range");
    }
    return this._sum(r) - this._sum(l);
  }
}

module.exports = FenwickTree;
