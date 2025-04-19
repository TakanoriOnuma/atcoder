// @ts-check
/**
 * @see https://atcoder.jp/contests/abc402/tasks/abc402_c
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [N, M] = inputList[0].split(" ").map(Number);

  /**
   * 料理ごとで使用している食材数
   * @typedef {Record<number, number>}
   */
  const ingredientCountMap = {};
  /**
   * 対象の食材が含まれている料理リスト
   * @typedef {Record<number, number[]>}
   */
  const ingredientDishesMap = {};

  for (let i = 0; i < M; i++) {
    const [K, ...dish] = inputList[i + 1].split(" ").map(Number);
    ingredientCountMap[i] = K;
    for (const ingredient of dish) {
      if (!ingredientDishesMap[ingredient]) {
        ingredientDishesMap[ingredient] = [];
      }
      ingredientDishesMap[ingredient].push(i);
    }
  }

  let total = 0;
  const dishes = inputList[M + 1].split(" ").map(Number);
  for (const dish of dishes) {
    for (const ingredient of ingredientDishesMap[dish] ?? []) {
      ingredientCountMap[ingredient] -= 1;
      if (ingredientCountMap[ingredient] === 0) {
        total += 1;
      }
    }

    console.log(total);
  }
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
