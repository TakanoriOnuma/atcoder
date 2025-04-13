// @ts-check
/**
 * @see https://atcoder.jp/contests/abc401/tasks/abc401_e
 */

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
   * @returns {number}
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
   * @returns {number} リーダー要素
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

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, M] = inputList[0].split(" ").map(Number);

  /**
   * 隣接リストマップ
   * @type {Record<number, number[]>}
   */
  const edgesMap = {};
  // edgeの初期化
  for (let i = 0; i < M; i++) {
    const [u, v] = inputList[i + 1].split(" ").map((str) => Number(str) - 1);
    if (!edgesMap[u]) {
      edgesMap[u] = [];
    }
    if (!edgesMap[v]) {
      edgesMap[v] = [];
    }
    edgesMap[u].push(v);
    edgesMap[v].push(u);
  }

  /** 連結成分数 */
  let connectedComponents = 0;
  /** グループ外の頂点数（消すべき頂点数） */
  let otherVertexCount = 0;
  /**
   * 連結済みマッピング
   * @type {Record<number, boolean>}
   */
  const connectedMap = {};
  const dsu = new DSU(N);

  for (let i = 0; i < N; i++) {
    connectedComponents += 1;
    // 既に連結済みの頂点の場合は、グループに含まれるので1つ減らす
    if (connectedMap[i]) {
      otherVertexCount -= 1;
    }

    for (const to of edgesMap[i] ?? []) {
      // グループ内の辺の場合
      if (to < i) {
        // 対象の頂点がグループに含まれていない場合は、グループに追加して、連結成分数を減らす
        if (!dsu.same(i, to)) {
          dsu.merge(i, to);
          connectedComponents -= 1;
        }
      } else {
        // 新規の頂点の場合はグループ外の頂点数を増やす
        if (!connectedMap[to]) {
          otherVertexCount += 1;
        }
        connectedMap[to] = true;
      }
    }

    // 連結成分が1つ（全ての頂点が連結）の場合は、グループ外の頂点数を削除することが回答になる
    if (connectedComponents === 1) {
      console.log(otherVertexCount);
    } else {
      // それ以外はそもそも条件を満たせないので-1を出力
      console.log(-1);
    }
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
