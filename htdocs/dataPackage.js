class Package {
  constructor(x, y, pcPos, speed, img){
    this.pos = createVector(x, y);
    this.pPos = pcPos;
    this.speed = speed;
    this.img = img;
  }

  move(){
    let dir = p5.Vector.sub(this.pPos, this.pos);
    dir.setMag(this.speed);
    this.pos.add(dir);
  }

  show(){
    stroke(255);
    strokeWeight(4);
    //point(this.pos.x, this.pos.y);
    image(this.img, this.pos.x, this.pos.y);
  }

  incrSpeed(dspeed){
    this.speed += dspeed;
  }

  collides(img){
    return (dist(this.pos.x, this.pos.y, this.pPos.x, this.pPos.y) <= img.width / 2);
  }

  clickedOn(x, y){
    return (x > this.pos.x && x < this.pos.x + this.img.width && y > this.pos.y && y < this.pos.y + this.img.height);
  }
}
