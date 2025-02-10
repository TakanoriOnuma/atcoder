const FenwickTree = require("./FenwickTree.js");

const A = [0, 1, 2, 3, 4, 5, 6, 7];
const fwTree = new FenwickTree(A.length);
for (let i = 0; i < A.length; i++) {
  fwTree.add(i, A[i]);
}
console.log(fwTree);

console.log(fwTree.sum(2, 4));
console.log(fwTree.sum(6, 7));
console.log(fwTree.sum(0, A.length));

fwTree.add(2, 6);
fwTree.add(5, -1);
console.log(fwTree);
console.log(fwTree.sum(0, 3));
console.log(fwTree.sum(3, 7));
