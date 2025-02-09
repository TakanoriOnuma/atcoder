/**
 * @see https://atcoder.jp/contests/abc392/tasks/abc392_e
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

  const dsu = new DSU(N);

  /**
   * 余分な辺リスト
   * @type {{ index: number; from: number; to: number }[]}
   */
  const redundantEdges = [];
  const edgeList = Array.from({ length: M }, (_, i) => {
    const [from, to] = inputList[i + 1].split(" ").map((v) => Number(v) - 1);
    if (dsu.same(from, to)) {
      redundantEdges.push({ index: i, from, to });
    } else {
      dsu.merge(from, to);
    }
    return { from, to };
  });

  const leaders = dsu.groups().map((group) => dsu.leader(group[0]));
  /** @type {Record<string, { index: number; from: number; to: number }[]>} */
  const redundantEdgesByGroupLeader = {};
  for (const redundantEdge of redundantEdges) {
    const fromGroupLeader = dsu.leader(redundantEdge.from);
    if (redundantEdgesByGroupLeader[fromGroupLeader] == null) {
      redundantEdgesByGroupLeader[fromGroupLeader] = [];
    }
    redundantEdgesByGroupLeader[fromGroupLeader].push(redundantEdge);
  }

  // 余分な辺が多いグループリーダー順にソート
  leaders.sort((leader1, leader2) => {
    return (
      (redundantEdgesByGroupLeader[leader2] ?? []).length -
      (redundantEdgesByGroupLeader[leader1] ?? []).length
    );
  });

  const minOperation = leaders.length - 1;
  console.log(minOperation);
  if (minOperation === 0) {
    return;
  }

  let targetLeaderIndex = 1;
  for (const leader of leaders) {
    const redundantEdges = redundantEdgesByGroupLeader[leader] ?? [];
    for (const edge of redundantEdges) {
      const targetLeader = leaders[targetLeaderIndex];
      console.log(`${edge.index + 1} ${edge.to + 1} ${targetLeader + 1}`);

      targetLeaderIndex += 1;
      if (targetLeaderIndex >= leaders.length) {
        return;
      }
    }
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
