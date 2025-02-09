const DSU = require("./DSU");

const dsu = new DSU(8);
dsu.merge(0, 1);
dsu.merge(1, 3);
dsu.merge(0, 4);
dsu.merge(5, 6);
dsu.merge(3, 7);

console.log(dsu);

console.log(dsu.groups());
console.log(dsu.leader(3));
console.log(dsu.same(1, 7));
console.log(dsu.same(0, 5));
console.log(dsu.size(6));
