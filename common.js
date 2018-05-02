/**
 * Given a set of points, lay them out in a phyllotaxis layout.
 * Mutates the `points` passed in by updating the x and y values.
 *
 * @param {Object[]} points The array of points to update. Will get `x` and `y` set.
 * @param {Number} pointWidth The size in pixels of the point's width. Should also include margin.
 * @param {Number} xOffset The x offset to apply to all points
 * @param {Number} yOffset The y offset to apply to all points
 *
 * @return {Object[]} points with modified x and y
 */
function phyllotaxisLayout(points, pointWidth, xOffset = 0, yOffset = 0, iOffset = 0) {
  // theta determines the spiral of the layout
  const theta = Math.PI * (3 - Math.sqrt(5));

  const pointRadius = pointWidth / 2;

  points.forEach((point, i) => {
    const index = (i + iOffset) % points.length;
    const phylloX = pointRadius * Math.sqrt(index) * Math.cos(index * theta);
    const phylloY = pointRadius * Math.sqrt(index) * Math.sin(index * theta);

    point.x = xOffset + phylloX - pointRadius;
    point.y = yOffset + phylloY - pointRadius;
  });

  return points;
}

/**
 * Given a set of points, lay them out in a grid.
 * Mutates the `points` passed in by updating the x and y values.
 *
 * @param {Object[]} points The array of points to update. Will get `x` and `y` set.
 * @param {Number} pointWidth The size in pixels of the point's width. Should also include margin.
 * @param {Number} gridWidth The width of the grid of points
 *
 * @return {Object[]} points with modified x and y
 */
function gridLayout(points, pointWidth, gridWidth) {
  const pointHeight = pointWidth;
  const pointsPerRow = Math.floor(gridWidth / pointWidth);
  const numRows = points.length / pointsPerRow;

  points.forEach((point, i) => {
    point.x = pointWidth * (i % pointsPerRow);
    point.y = pointHeight * Math.floor(i / pointsPerRow);
  });

  return points;
}

/**
 * Given a set of points, lay them out randomly.
 * Mutates the `points` passed in by updating the x and y values.
 *
 * @param {Object[]} points The array of points to update. Will get `x` and `y` set.
 * @param {Number} pointWidth The size in pixels of the point's width. Should also include margin.
 * @param {Number} width The width of the area to place them in
 * @param {Number} height The height of the area to place them in
 *
 * @return {Object[]} points with modified x and y
 */
function randomLayout(points, pointWidth, width, height) {
  points.forEach((point, i) => {
    point.x = Math.random() * (width - pointWidth);
    point.y = Math.random() * (height - pointWidth);
  });

  return points;
}

/**
 * Given a set of points, lay them out in a sine wave.
 * Mutates the `points` passed in by updating the x and y values.
 *
 * @param {Object[]} points The array of points to update. Will get `x` and `y` set.
 * @param {Number} pointWidth The size in pixels of the point's width. Should also include margin.
 * @param {Number} width The width of the area to place them in
 * @param {Number} height The height of the area to place them in
 *
 * @return {Object[]} points with modified x and y
 */
function sineLayout(points, pointWidth, width, height) {
  const amplitude = 0.3 * (height / 2);
  const yOffset = height / 2;
  const periods = 3;
  const yScale = d3.scaleLinear()
    .domain([0, points.length - 1])
    .range([0, periods * 2 * Math.PI]);

  points.forEach((point, i) => {
    point.x = (i / points.length) * (width - pointWidth);
    point.y = amplitude * Math.sin(yScale(i)) + yOffset;
  });

  return points;
}

/**
 * Given a set of points, lay them out in a spiral.
 * Mutates the `points` passed in by updating the x and y values.
 *
 * @param {Object[]} points The array of points to update. Will get `x` and `y` set.
 * @param {Number} pointWidth The size in pixels of the point's width. Should also include margin.
 * @param {Number} width The width of the area to place them in
 * @param {Number} height The height of the area to place them in
 *
 * @return {Object[]} points with modified x and y
 */
function spiralLayout(points, pointWidth, width, height) {
  const amplitude = 0.3 * (height / 2);
  const xOffset = width / 2;
  const yOffset = height / 2;
  const periods = 20;

  const rScale = d3.scaleLinear()
    .domain([0, points.length -1])
    .range([0, Math.min(width / 2, height / 2) - pointWidth]);

  const thetaScale = d3.scaleLinear()
    .domain([0, points.length - 1])
    .range([0, periods * 2 * Math.PI]);

  points.forEach((point, i) => {
    point.x = rScale(i) * Math.cos(thetaScale(i)) + xOffset
    point.y = rScale(i) * Math.sin(thetaScale(i)) + yOffset;
  });

  return points;
}

/** Circle layout **/

function circleLayout(points, pointWidth, width, height) {
	
	const circleCentreX = width / 2;
	const circleCentreY = height / 2;
	
	const r = height / 3;
	
	//angle scale
	
  const aScale = d3.scaleLinear()
    .domain([0, points.length -1])
    .range([0, (2 * Math.PI)]);
	
	points.forEach((point, i) => {
		point.x = circleCentreX+r*Math.cos(aScale(i)); 
		point.y = circleCentreY+r*Math.sin(aScale(i));
	});
}

/** Square layout **/

function squareLayout(points, pointWidth, width, height) {
	
	const firstScale = d3.scaleLinear()
	.domain([0, points.length - 1])
	.range([width/4, (width/4 * 3)]);

  const secondScale = d3.scaleLinear()
	.domain([0, points.length - 1])
	.range([height/4, (height/4 * 3)]);

  const coords = [[width/4, height/4], [(width/4)*3, height/4], [(width/4)*3, (height/4)*3], [width/4, (height/4)*3]]


	
	points.forEach((point, i) => {
//	for (i=0; i < points/2 -1; i++ ) 
//  {

    for (i=1; points/4; i++) {
      point.x = firstScale(i);
	    point.y = height/4;
      for (i=1; points/4; i++) {

      }
    }

  if (i < points/2- 1) {
	    point.x = firstScale(i);
	    point.y = height/4;
  }
  else {
    point.x = (width/4)*3;
	  point.y = secondScale(i);
  }
//	}
});

return points;
	
}

/**
 * Generate an object array of `numPoints` length with unique IDs
 * and assigned colors
 */
function createPoints(numPoints, pointWidth, width, height) {
  const colorScale = d3.scaleSequential(d3.interpolateViridis)
    .domain([numPoints - 1, 0]);

  const points = d3.range(numPoints).map(id => ({
    id,
    color: colorScale(id),
  }));

  return randomLayout(points, pointWidth, width, height);
}