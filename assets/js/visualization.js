document.addEventListener('DOMContentLoaded', () => {
  const svgNS = "http://www.w3.org/2000/svg";
  let svg, container, shapes = [];

  function createVisualization() {
    svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 800 800');
    container = document.getElementById('visualization-canvas');
    if (!container) return; // Exit if the container element is not found
    svg.setAttribute('height', container.clientHeight);
    container.appendChild(svg);

    const defs = document.createElementNS(svgNS, 'defs');
    svg.appendChild(defs);

    // Define drop shadow filters for light and dark themes
    const lightFilter = document.createElementNS(svgNS, 'filter');
    lightFilter.setAttribute('id', 'dropShadowLight');
    const feGaussianBlurLight = document.createElementNS(svgNS, 'feGaussianBlur');
    feGaussianBlurLight.setAttribute('in', 'SourceAlpha');
    feGaussianBlurLight.setAttribute('stdDeviation', '2'); // Less blur for light theme
    lightFilter.appendChild(feGaussianBlurLight);
    const feOffsetLight = document.createElementNS(svgNS, 'feOffset');
    feOffsetLight.setAttribute('dx', '2'); // Less offset for light theme
    feOffsetLight.setAttribute('dy', '4'); // Less offset for light theme
    lightFilter.appendChild(feOffsetLight);
    const feComponentTransferLight = document.createElementNS(svgNS, 'feComponentTransfer');
    const feFuncALight = document.createElementNS(svgNS, 'feFuncA');
    feFuncALight.setAttribute('type', 'linear');
    feFuncALight.setAttribute('slope', '0.1'); // Less alpha transparency for light theme
    feComponentTransferLight.appendChild(feFuncALight);
    lightFilter.appendChild(feComponentTransferLight);
    const feMergeLight = document.createElementNS(svgNS, 'feMerge');
    const feMergeNode1Light = document.createElementNS(svgNS, 'feMergeNode');
    lightFilter.appendChild(feMergeLight);
    feMergeLight.appendChild(feMergeNode1Light);
    const feMergeNode2Light = document.createElementNS(svgNS, 'feMergeNode');
    feMergeNode2Light.setAttribute('in', 'SourceGraphic');
    feMergeLight.appendChild(feMergeNode2Light);
    defs.appendChild(lightFilter);

    const darkFilter = document.createElementNS(svgNS, 'filter');
    darkFilter.setAttribute('id', 'dropShadowDark');
    const feGaussianBlurDark = document.createElementNS(svgNS, 'feGaussianBlur');
    feGaussianBlurDark.setAttribute('in', 'SourceAlpha');
    feGaussianBlurDark.setAttribute('stdDeviation', '5'); // More blur for dark theme
    darkFilter.appendChild(feGaussianBlurDark);
    const feOffsetDark = document.createElementNS(svgNS, 'feOffset');
    feOffsetDark.setAttribute('dx', '5'); // More offset for dark theme
    feOffsetDark.setAttribute('dy', '10'); // More offset for dark theme
    darkFilter.appendChild(feOffsetDark);
    const feComponentTransferDark = document.createElementNS(svgNS, 'feComponentTransfer');
    const feFuncADark = document.createElementNS(svgNS, 'feFuncA');
    feFuncADark.setAttribute('type', 'linear');
    feFuncADark.setAttribute('slope', '0.2'); // More alpha transparency for dark theme
    feComponentTransferDark.appendChild(feFuncADark);
    darkFilter.appendChild(feComponentTransferDark);
    const feMergeDark = document.createElementNS(svgNS, 'feMerge');
    const feMergeNode1Dark = document.createElementNS(svgNS, 'feMergeNode');
    darkFilter.appendChild(feMergeDark);
    feMergeDark.appendChild(feMergeNode1Dark);
    const feMergeNode2Dark = document.createElementNS(svgNS, 'feMergeNode');
    feMergeNode2Dark.setAttribute('in', 'SourceGraphic');
    feMergeDark.appendChild(feMergeNode2Dark);
    defs.appendChild(darkFilter);

    shapes = [];

    // Create a circle
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', 0);
    circle.setAttribute('cy', 0);
    circle.setAttribute('r', '60');
    circle.setAttribute('fill', 'rgb(214,65,105)'); // Purple
    circle.setAttribute('filter', 'url(#dropShadowLight)'); // Default to light theme
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
    square.setAttribute('fill', 'rgb(56,163,208)'); // Blue
    square.setAttribute('filter', 'url(#dropShadowLight)'); // Default to light theme
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
    triangle.setAttribute('fill', 'rgb(125,53,202)'); // Another color
    triangle.setAttribute('rx', '3'); // Rounded corners
    triangle.setAttribute('ry', '3'); // Rounded corners
    triangle.setAttribute('filter', 'url(#dropShadowLight)'); // Default to light theme
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
      const angle = progress * speed - (index * 2 * Math.PI) / shapes.length; // Reversed spin direction
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle) * 0.7; // Increased vertical oscillation
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

  // Change filter based on theme
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  function updateFilter() {
    const filterId = prefersDarkScheme.matches ? 'dropShadowDark' : 'dropShadowLight';
    shapes.forEach(shape => {
      shape.setAttribute('filter', `url(#${filterId})`);
    });
  }

  prefersDarkScheme.addEventListener('change', updateFilter);
  updateFilter();

  window.addEventListener('resize', resetVisualization);
});