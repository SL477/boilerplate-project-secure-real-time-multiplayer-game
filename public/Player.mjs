class Player {
  constructor({x, y, score, id}) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
  }

  movePlayer(dir, speed) {

  }

  collision(item) {
    if (this.x == item.x && this.y == item.y) {
      this.score += item.value;
    }
  }

  calculateRank(arr) {

  }
}

export default Player;
