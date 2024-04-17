const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
var randomColor = require('randomcolor');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const createFrid = () => {
    let points = [];
    const count = 25;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push([u, v]);
      }
    }
    return points;
  };

  const points = createFrid().filter(() => Math.random() > 0.5);
  const margin = 300;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    points.forEach(([u, v]) => {
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      const color = randomColor();
      context.beginPath();
      context.arc(x, y, 25, 0, Math.PI * 2, false);
      context.strokeStyle = color;
      context.lineWidth = 20;
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
