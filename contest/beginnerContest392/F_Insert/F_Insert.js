/**
 * @see https://atcoder.jp/contests/abc392/tasks/abc392_f
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

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N] = inputList[0].split(" ").map(Number);
  const P_List = inputList[1].split(" ").map(Number);
  /** 最終的に挿入された配列 */
  const A = new Array(N);

  // 要素の存在フラグをフェニックツリーで管理。
  // 1: 存在, 0: 存在しない
  const existTree = new FenwickTree(N);
  for (let i = 0; i < N; i++) {
    existTree.add(i, 1);
  }

  /**
   * 存在する要素の位置から、実際のツリー上の位置を求める
   * @param {number} p - 存在する要素の位置
   */
  const findTreeIndexFromTree = (p) => {
    let left = 0;
    let right = N;
    while (right - left > 1) {
      const mid = Math.floor((left + right) / 2);
      if (existTree.sum(0, mid) >= p) {
        right = mid;
      } else {
        left = mid;
      }
    }
    return left;
  };

  // 操作の逆をする（削除していく）
  for (let i = N - 1; i >= 0; i--) {
    const p = P_List[i];
    const treeIndex = findTreeIndexFromTree(p);
    existTree.add(treeIndex, -1);
    // 削除された場所にループ値を入れる
    A[treeIndex] = i + 1;
  }

  // 回答
  console.log(A.join(" "));
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
