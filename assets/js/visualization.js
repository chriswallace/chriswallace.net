document.addEventListener('DOMContentLoaded', () => {
  const svgNS = "http://www.w3.org/2000/svg";
  let svg, container, shapes = [];

  function createVisualization() {
    svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 800 800');
    container = document.getElementById('visualization-canvas');
    svg.setAttribute('height', container.clientHeight);
    container.appendChild(svg);

    const defs = document.createElementNS(svgNS, 'defs');
    svg.appendChild(defs);

    // Define a more dramatic drop shadow filter with alpha transparency
    const filter = document.createElementNS(svgNS, 'filter');
    filter.setAttribute('id', 'dropShadow');
    const feGaussianBlur = document.createElementNS(svgNS, 'feGaussianBlur');
    feGaussianBlur.setAttribute('in', 'SourceAlpha');
    feGaussianBlur.setAttribute('stdDeviation', '5'); // Increased blur
    filter.appendChild(feGaussianBlur);
    const feOffset = document.createElementNS(svgNS, 'feOffset');
    feOffset.setAttribute('dx', '5'); // Increased offset
    feOffset.setAttribute('dy', '10'); // Increased offset
    filter.appendChild(feOffset);
    const feComponentTransfer = document.createElementNS(svgNS, 'feComponentTransfer');
    const feFuncA = document.createElementNS(svgNS, 'feFuncA');
    feFuncA.setAttribute('type', 'linear');
    feFuncA.setAttribute('slope', '0.2'); // Adjust alpha transparency
    feComponentTransfer.appendChild(feFuncA);
    filter.appendChild(feComponentTransfer);
    const feMerge = document.createElementNS(svgNS, 'feMerge');
    const feMergeNode1 = document.createElementNS(svgNS, 'feMergeNode');
    filter.appendChild(feMerge);
    feMerge.appendChild(feMergeNode1);
    const feMergeNode2 = document.createElementNS(svgNS, 'feMergeNode');
    feMergeNode2.setAttribute('in', 'SourceGraphic');
    feMerge.appendChild(feMergeNode2);
    defs.appendChild(filter);

    shapes = [];

    // Create a circle
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', 0);
    circle.setAttribute('cy', 0);
    circle.setAttribute('r', '60');
    circle.setAttribute('fill', 'rgb(218,77,79)'); // Purple
    circle.setAttribute('filter', 'url(#dropShadow)');
    svg.appendChild(circle);
    shapes.push(circle);

    // Create a square with rounded corners
    const square = document.createElementNS(svgNS, 'rect');
    square.setAttribute('x', -60);
    square.setAttribute('y', -60);
    square.setAttribute('width', '120');
    square.setAttribute('height', '120');
    square.setAttribute('rx', '5'); // Rounded corners
    square.setAttribute('ry', '5'); // Rounded corners
    square.setAttribute('fill', 'rgb(118,67,211)'); // Blue
    square.setAttribute('filter', 'url(#dropShadow)');
    svg.appendChild(square);
    shapes.push(square);

    // Create an equilateral triangle
    const triangle = document.createElementNS(svgNS, 'polygon');
    const sideLength = 200;
    const height = (Math.sqrt(3) / 2) * sideLength;
    const x1 = 0;
    const y1 = -(1 / 3) * height - 20; // Adjusted to prevent clipping and shifted up
    const x2 = -sideLength / 2;
    const y2 = (2 / 3) * height - 20; // Shifted up
    const x3 = sideLength / 2;
    const y3 = (2 / 3) * height - 20; // Shifted up
    triangle.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
    triangle.setAttribute('fill', 'rgb(85,78,210)'); // Another color
    triangle.setAttribute('rx', '3'); // Rounded corners
    triangle.setAttribute('ry', '3'); // Rounded corners
    triangle.setAttribute('filter', 'url(#dropShadow)');
    svg.appendChild(triangle);
    shapes.push(triangle);
  }

  let start = null;

  // Animation parameters
  const centerX = 400;
  const centerY = 400;
  const radius = 180;
  const depth = 180;
  const speed = 0.0002; // Rotation speed

  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;

    // Create an array of shapes with their z-index
    const shapesWithZIndex = shapes.map((shape, index) => {
      const angle = progress * speed + (index * 2 * Math.PI) / shapes.length;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle) * 0.5; // Add vertical oscillation
      const z = depth * Math.sin(angle);

      // Perspective projection
      const scale = 1 + z / 400;
      const sizeAdjustment = shape === shapes[2] ? 0.8 + z / 800 : 1 + z / 800; // Adjust size based on z-index, smaller for triangle

      // Add rotation for square and triangle
      const rotation = shape === shapes[0] ? 0 : progress * 0.02; // No rotation for circle, slight rotation for others
      shape.setAttribute('transform', `translate(${x}, ${y}) scale(${scale * sizeAdjustment}) rotate(${rotation})`);

      return { shape, z };
    });

    // Sort shapes by z-index
    shapesWithZIndex.sort((a, b) => a.z - b.z);

    // Append shapes in the correct order
    shapesWithZIndex.forEach(({ shape }) => {
      svg.appendChild(shape);
    });

    requestAnimationFrame(animate);
  }

  function resetVisualization() {
    if (svg) {
      container.removeChild(svg);
    }
    createVisualization();
    start = null;
    requestAnimationFrame(animate);
  }

  createVisualization();
  requestAnimationFrame(animate);

  window.addEventListener('resize', resetVisualization);
});