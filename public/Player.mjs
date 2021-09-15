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
      if (this.y < 20) {
        this.y = 20;
      }
    }
    else if (dir == 'DOWN') {
      this.y += speed;
      if (this.y > 460) {
        this.y = 460;
      }
    }
    else if (dir == 'LEFT') {
      this.x -= speed;
      if (this.x < 0) {
        this.x = 0;
      }
    }
    else {
      // RIGHT
      this.x += speed;
      if (this.x > 620) {
        this.x = 620;
      }
    }
  }

  collision(item) {
    let diffx = Math.abs(this.x - item.x);
    let diffy = Math.abs(this.y - item.y);
    if (diffx < 12 && diffy < 12) {
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
