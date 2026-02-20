const xCoordinates = [];
const yCoordinates = [];
const url = [];

const xCoordinatesUser = [];
const yCoordinatesUser = [];

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
