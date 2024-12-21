/**
 * @see https://atcoder.jp/contests/abc385/tasks/abc385_b
 */

/**
 * メイン実行
 * @param {string} input - 入力
 */
function Main(input) {
  const inputList = input.split("\n");
  const [H, W, X, Y] = inputList[0].split(" ").map(Number);
  const map = Array.from({ length: H }, (_, i) => {
    return inputList[i + 1].split("");
  });
  const commands = inputList[H + 1].split("");

  /** 通過したマップデータ */
  const passMap = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => -1)
  );
  const debugPassMap = () => {
    for (let y = 0; y < H; y++) {
      console.log(passMap[y].join(" "));
    }
  };

  // indexが0からなので-1でスタート
  let posX = X - 1;
  let posY = Y - 1;
  passMap[posX][posY] = 0;

  const checkPassible = (x, y) => {
    if (x < 0 || H <= x) {
      return false;
    }
    if (y < 0 || W <= y) {
      return false;
    }
    if (map[x][y] === "#") {
      return false;
    }
    return true;
  };

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    switch (command) {
      case "U": {
        if (checkPassible(posX - 1, posY)) {
          posX -= 1;
          passMap[posX][posY] = i + 1;
        }
        break;
      }
      case "D": {
        if (checkPassible(posX + 1, posY)) {
          posX += 1;
          passMap[posX][posY] = i + 1;
        }
        break;
      }
      case "L": {
        if (checkPassible(posX, posY - 1)) {
          posY -= 1;
          passMap[posX][posY] = i + 1;
        }
        break;
      }
      case "R": {
        if (checkPassible(posX, posY + 1)) {
          posY += 1;
          passMap[posX][posY] = i + 1;
        }
        break;
      }
    }
  }

  // debugPassMap();

  let numPassHouse = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (passMap[y][x] >= 0 && map[y][x] === "@") {
        numPassHouse += 1;
      }
    }
  }

  // 回答
  console.log(`${posX + 1} ${posY + 1} ${numPassHouse}`);
}

Main(require("fs").readFileSync("/dev/stdin", "utf8"));
