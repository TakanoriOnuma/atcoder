# FenwickTree（フェニックツリー）

BIT(Binary Indexed Tree)とも呼ばれる木構造を提供するライブラリ

## メモ

```javascript
// LSB(Least Significant Bit)の算出
function lsb(p) {
  // '1'の最下位ビットの算出は2の補数の論理積から算出できる
  return p & -p;
}
```

## 参考

- [【Fenwick_Tree 編】AtCoder Library 解読 〜Python での実装まで〜](https://qiita.com/AkariLuminous/items/f2f7930e7f67963f0493)
- [データ構造 Fenwick tree (binary indexed tree, BIT) にどっぷりと入門し、その美しき構造に心を洗われたい方のための紹介記事です！](https://qiita.com/ngtkana/items/7d50ff180a4e5c294cb7)
