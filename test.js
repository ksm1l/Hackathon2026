const startBtn = document.getElementById("start");
const pinDrop = document.getElementById("mapbtn");
const sendBtn = document.getElementById("send");
const scoreSetter = document.getElementById("scoreSetter");

// constants of the limits of our picture in real coordinates
const northLimit = 49.812889;
const southLimit = 49.804333;
const westLimit = -97.142139;
const eastLimit = -97.128248;

// variables
var currImg = 0;
var xCoordsUser = 0;
var yCoordsUser = 0;
var score = 0;
var distance = 0;

// starts
startBtn.addEventListener("click", killDiv);

// gives location of click within the map
pinDrop.addEventListener("click", function (e) {
  getPos(e);
});

// will be used to into the next picture
sendBtn.addEventListener("click", changeImage);

// transforms map coord into pixel coord
function transformX(coordWE) {
  let base1 = 1 - (-coordWE + eastLimit) / (-westLimit + eastLimit);
  return base1 * 1300;
}

// transforms map coord into pixel coord
function transformY(coordNS) {
  let base1 = 1 - (coordNS - southLimit) / (northLimit - southLimit);
  return base1 * 1241;
}

// gets click position and calculates distance from set target
function getPos(e) {
  xCoordsUser = e.offsetX;
  yCoordsUser = e.offsetY;
  distance = distanceCalc(
    xCoordsUser,
    yCoordsUser,
    transformX(xCoords[currImg]),
    transformY(yCoords[currImg]),
  );
  console.log("distance from pic#" + currImg + " is " + distance + " pixels");
  //console.log(transformX(xCoords[0]));
  //console.log(xCoordsUser);
  //console.log(transformY(yCoords[0]));
  //console.log(yCoordsUser);
}

// starts
function killDiv() {
  console.log("currImg");
  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("imageSide").style.display = "block";
  document.getElementById("mapSide").style.display = "flex";
}

// rotates through an array of images
function changeImage() {
  if (distance == 0) {
    alert("Please choose a point.");
  } else {
    if (currImg < 4) {
      currImg = currImg + 1;
      document.getElementById("image").style.backgroundImage = url[currImg];
      score = score + pointsCalc(distance);
      distance = 0;
      window.scrollTo(0, 0);
    } else {
      document.getElementById("game").style.display = "none";
      document.getElementById("endScreen").style.display = "flex";
      scoreSetter.innerHTML = score;
    }
  }
}

//first coords are the quad
const xCoords = [-97.130851, -97.136417, -97.137798, -97.137111, -97.134773];
const yCoords = [49.810017, 49.810917, 49.810417, 49.810608, 49.811021];
const url = [
  , "url('https://ksm1l.github.io/Hackathon2026/images/image2.png')"
  , "url('https://ksm1l.github.io/Hackathon2026/images/image3.png')"
  , "url('https://ksm1l.github.io/Hackathon2026/images/image4.png')"
  , "url('https://ksm1l.github.io/Hackathon2026/images/image5.png')"
];



function distanceCalc(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  let x, y;
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

  let distanceInM = distanceInKm;

  return Math.sqrt(dx * dx + dy * dy);
}

//let calcDistance = distanceCalc();

// updated, max points are 100 per round
function pointsCalc(distance) {
  let points = 100;
  let maxDistance = 175;
  let minDistance = 25;

  if (distance > minDistance) {
    points = Math.max((1 - (distance - minDistance) / maxDistance) * 100, 0);
  }

  return points;
}
