const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const randomColor = require('randomcolor');
const palettes = require('nice-color-palettes');

// const settings = {
//   dimensions: [2048, 2048],
// };

// const sketch = () => {
//   const createFrid = () => {
//     let points = [];
//     const count = 25;
//     for (let x = 0; x < count; x++) {
//       for (let y = 0; y < count; y++) {
//         const u = count <= 1 ? 0.5 : x / (count - 1);
//         const v = count <= 1 ? 0.5 : y / (count - 1);
//         points.push([u, v]);
//       }
//     }
//     return points;
//   };

//   const points = createFrid().filter(() => random.value() > 0.5);
//   const margin = 300;

//   return ({ context, width, height }) => {
//     context.fillStyle = 'white';
//     context.fillRect(0, 0, width, height);
//     points.forEach(([u, v]) => {
//       const x = lerp(margin, width - margin, u);
//       const y = lerp(margin, height - margin, v);
//       const color = randomColor();
//       context.beginPath();
//       context.arc(x, y, 25, 0, Math.PI * 2, false);
//       context.strokeStyle = color;
//       context.lineWidth = 20;
//       context.stroke();
//     });
//   };
// };

// canvasSketch(sketch, settings);

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const palette = random.pick(palettes);
  const createGrid = () => {
    let points = [];
    const count = 50;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.08;
        points.push({
          color: random.pick(palette),
          radius,
          rotation: random.noise2D(u, v),
          position: [u, v],
        });
      }
    }
    return points;
  };
  const points = createGrid().filter(() => random.value() > 0.2);
  const margin = 300;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    points.forEach(({ radius, position, color, rotation }) => {
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      const text = ['⁜', '※', '=', '»'];
      const pick = random.pick(text);
      const colorRan = randomColor({ luminosity: 'light' });

      // context.beginPath();
      // context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      // context.fillStyle = color;
      // context.fill();
      context.save();
      context.fillStyle = color;
      context.font = `${radius * width}px "Arial"`;
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText('=', 0, 0);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
