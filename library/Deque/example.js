// @ts-check
const Deque = require("./Deque");

/** @type {Deque<number>} */
const numberDeque = new Deque();
numberDeque.pushBack(3);
numberDeque.pushBack(4);
numberDeque.pushBack(5);
numberDeque.pushFront(2);
numberDeque.pushFront(1);
numberDeque.pushBack(6);
console.log(numberDeque);

while (true) {
  const value = numberDeque.popFront();
  if (value == null) {
    break;
  }
  process.stdout.write(`${value} `);
}
console.log("\n");

/** @type {Deque<{ id: number; value: number }>} */
const itemDeque = new Deque();
itemDeque.pushBack({ id: 1, value: 3 });
itemDeque.pushBack({ id: 2, value: 4 });
itemDeque.pushBack({ id: 3, value: 5 });
itemDeque.pushFront({ id: 4, value: 2 });
itemDeque.pushFront({ id: 5, value: 1 });
itemDeque.pushBack({ id: 6, value: 6 });
console.log(itemDeque);

while (true) {
  const item = itemDeque.popFront();
  if (item == null) {
    break;
  }
  console.log(item);
}
