// @ts-check
const Heap = require("./Heap");

/** @type {Heap<number>} */
const numberHeap = new Heap((a, b) => a - b);
numberHeap.push(3);
numberHeap.push(1);
numberHeap.push(7);
numberHeap.push(4);
numberHeap.push(9);
numberHeap.push(2);
numberHeap.push(5);
numberHeap.push(6);
numberHeap.push(8);
while (numberHeap.getSize() > 0) {
  process.stdout.write(`${numberHeap.pop()} `);
}
console.log("\n");

/** @type {Heap<{ id: number; value: number }>} */
const itemHeap = new Heap((a, b) => a.value - b.value);
itemHeap.push({ id: 1, value: 3 });
itemHeap.push({ id: 2, value: 1 });
itemHeap.push({ id: 3, value: 7 });
itemHeap.push({ id: 4, value: 4 });
itemHeap.push({ id: 5, value: 9 });
itemHeap.push({ id: 6, value: 2 });
itemHeap.push({ id: 7, value: 5 });
itemHeap.push({ id: 8, value: 6 });
itemHeap.push({ id: 9, value: 8 });

const sortedItems = [];
while (itemHeap.getSize() > 0) {
  const item = itemHeap.pop();
  sortedItems.push(item);
}
console.log(sortedItems);
