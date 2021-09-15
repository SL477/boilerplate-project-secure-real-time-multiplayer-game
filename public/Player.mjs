class Player {
  constructor({x, y, score, id}) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
  }

  movePlayer(dir, speed) {
    dir = dir.toUpperCase();
    if (dir == 'UP') {
      this.y -= speed;
    }
    else if (dir == 'DOWN') {
      this.y += speed;
    }
    else if (dir == 'LEFT') {
      this.x -= speed;
    }
    else {
      // RIGHT
      this.x += speed;
    }
  }

  collision(item) {
    let diffx = Math.abs(this.x - item.x);
    let diffy = Math.abs(this.y - item.y);
    if (diffx < 10 && diffy < 10) {
      this.score += item.value;
      return true;
    }
    return false;
  }

  calculateRank(arr) {
    arr.sort((i, j) => {
      return j.score - i.score;
    });

    let idx = arr.findIndex(a => {return a.id == this.id});
    return "Rank: " + (idx + 1).toString() + " / " + arr.length.toString();
  }
}

export default Player;
