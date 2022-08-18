const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// write a function that will populate video
async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true, audio:false
  });
  video.srcObject = stream;
  await video.play();
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width
  canvas.height = height

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);

    // mess with them
    // 'distort' functions

    // pixels = redEffect(pixels);

    // pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.1;

    // pixels = grayscale(pixels)

    pixels = fun(pixels)

    // put them back
    ctx.putImageData(pixels, 0, 0)
  }, 16);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'heyyou');
  link.innerHTML = `<img src="${data}" alt="Hey, it's you" />`
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // i + 0 = red
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // i + 1 = green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // i + 2 = blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // i + 0 = red
    pixels.data[i + 500] = pixels.data[i + 1]; // i + 1 = green
    pixels.data[i - 150] = pixels.data[i + 2]; // i + 2 = blue
  }
  return pixels;
}

function grayscale(pixels) {
  for(let i = 0; i < pixels.data.length; i+=4) {
    let count = pixels.data[i] + pixels.data[i + 1] + pixels.data[i + 2];
    let colour = 0;
    if (count > 510) colour = 255;
    else if (count > 255) colour = 127.5;

    pixels.data[i] = colour;
    pixels.data[i + 1] = colour;
    pixels.data[i + 2] = colour;
    pixels.data[i + 3] = 255;
  }
  return pixels;
}

function fun(pixels) {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = 0; // i + 0 = red
    pixels.data[i + 1] = pixels.data[i + 1]; // i + 1 = green
    pixels.data[i + 2] = pixels.data[i + 2]; // i + 2 = blue
  }
  return pixels;
}

populateVideo()

video.addEventListener('canplay', paintToCanvas);
