let c1, c2;
let n = 36;
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(15);
}

function draw() {
  background(15);
  stroke(190);
  strokeWeight(0.5);

  for (let j = 0; j < n; j++) {
    let x = map(j % 6, 0, 5, 100, windowWidth - 100);
    let y = map(int(j / 6), 0, 5, 100, windowHeight - 100);
    var sins = map(sin(angle), -1, 1, -20, 20);

    for (let i = 0; i < 4000; i++) {
      let a = TWO_PI * random();
      let r = (windowWidth / 16) * pow(random(), map(j, 0, n - 1, 0.1, 0.01)); //point density
      point(cos(a) * r + x + sins * 0.2 * (j + 1), sin(a) * r + y);
    }
    angle += 0.01;
  }
}
