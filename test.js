const startBtn = document.getElementById("start");
const pinDrop = document.getElementById("mapbtn");
const sendBtn = document.getElementById("send");

// constants of the limits of our picture in real coordinates
const northLimit = 49.813089;
const southLimit = 49.804333;
const westLimit = -97.142139;
const eastLimit = -97.128248;

// starts
startBtn.addEventListener("click", killDiv);

// gives location of click within the map
pinDrop.addEventListener("click", function (e) {
  getPos(e)

});

// will be used to into the next picture
sendBtn.addEventListener("click", changeImage);

// transforms map coord into pixel coord
function transformX(coordWE) {
  let base1 = 1 - (-coordWE + eastLimit) / (-westLimit + eastLimit)
  return base1 * 1300;
}

// transforms map coord into pixel coord
function transformY(coordNS) {
  let base1 = 1 - (coordNS - southLimit) / (northLimit - southLimit)
  return base1 * 1241;
}

// gets click position and calculates distance from set target
function getPos(e) {
  xCoordsUser = e.offsetX;
  yCoordsUser = e.offsetY;
  let result = distanceCalc(xCoordsUser, yCoordsUser, transformX(xCoords[0]), transformY(yCoords[0]));
  console.log('distance from the quad is ' + result + ' pixels');
  console.log(transformX(xCoords[0]));
  console.log(transformY(yCoords[0]));
}

// starts 
function killDiv() {
  console.log('currImg');
  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("imageSide").style.display = "block";
  document.getElementById("mapSide").style.display = "flex";
}

// rotates through an array of images
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




//first coords are the quad
const xCoords = [-97.132071];
const yCoords = [49.808769];
const url = ["url('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pink_lady_and_cross_section.jpg/1920px-Pink_lady_and_cross_section.jpg')"
  , "url('https://raw.githubusercontent.com/ksm1l/test/refs/heads/main/image1.png')"
  , "url('https://raw.githubusercontent.com/ksm1l/test/refs/heads/main/image2.png')"
  , "url('https://raw.githubusercontent.com/ksm1l/test/refs/heads/main/image3.png')"
  , "url('https://raw.githubusercontent.com/ksm1l/test/refs/heads/main/image4.png')"
];

var currImg = 0;
var xCoordsUser = 0;
var yCoordsUser = 0;

function distanceCalc(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;


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

// not updated
function pointsCalc(distance) {
  let points = 100;
  let maxDistance = 500;
  let minDistance = 20;

  if (distance > minDistance) {
    points = (1 - (distance - minDistance) / maxDistance) * 100;
  }

  return points;
}
