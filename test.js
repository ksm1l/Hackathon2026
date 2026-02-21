const startBtn = document.getElementById("start");
const pinDrop = document.getElementById("mapbtn");
const sendBtn = document.getElementById("send");

startBtn.addEventListener("click", killDiv);
pinDrop.addEventListener("click", function (e) {
  getPos(e)
});
sendBtn.addEventListener("click", changeImage);


function getPos(e) {
  xCoordsUser = e.offsetX;
  yCoordsUser = e.offsetY;
  console.log(xCoordsUser + ' ' + yCoordsUser);
}

function killDiv() {
  console.log('currImg');
  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("imageSide").style.display = "block";
  document.getElementById("mapSide").style.display = "flex";
}

function changeImage() {
  if (currImg < 5) {

    document.getElementById("image").style.backgroundImage = url[currImg];
    console.log(currImg);
    currImg = currImg + 1;
  }
  else {
    document.getElementById("game").style.display = "none";
  }
}

var currImg = 0;


const xCoords = [];
const yCoords = [];
const url = ["url('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pink_lady_and_cross_section.jpg/1920px-Pink_lady_and_cross_section.jpg')"
  , "url('https://raw.githubusercontent.com/ksm1l/test/refs/heads/main/image1.png')"
  , "url('https://raw.githubusercontent.com/ksm1l/test/refs/heads/main/image2.png')"
  , "url('https://raw.githubusercontent.com/ksm1l/test/refs/heads/main/image3.png')"
  , "url('https://raw.githubusercontent.com/ksm1l/test/refs/heads/main/image4.png')"
];

var xCoordsUser = 0;
var yCoordsUser = 0;

let points = pointsCalc(21);
console.log(points);

function distanceCalc(x, y, x2, y2) {
  let rad = 6371;

  let xDegLat = x * (Math.PI / 180);
  let yDegLong = y * (Math.PI / 180);

  let x2DegLat = x2 * (Math.PI / 180);
  let y2DegLong = y2 * (Math.PI / 180);

  let degreeLat = x2DegLat - xDegLat;
  let degreeLong = y2DegLong - yDegLong;

  let a =
    Math.sin(degreeLat / 2) * Math.sin(degreeLat / 2) +
    Math.cos(xDegLat) *
    Math.cos(x2DegLat) *
    Math.sin(degreeLong / 2) *
    Math.sin(degreeLong / 2);

  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let distanceInKm = rad * c;

  let distanceInM = distanceInKm / 1000;

  return distanceInM;
}

//let calcDistance = distanceCalc();

function pointsCalc(distance) {
  let points = 100;
  let maxDistance = 500;
  let minDistance = 20;

  if (distance > minDistance) {
    points = (1 - (distance - minDistance) / maxDistance) * 100;
  }

  return points;
}
