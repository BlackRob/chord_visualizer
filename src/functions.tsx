const calculateColor = (freq: number, numbo: string) => {
  let r = 255;
  let g = 255;
  let b = 255;
  let lowestFreq = 82; // E2
  let highestFreq = 660; // E5
  if (numbo === "2") {
    // steelblue is 70,130,180 to skyblue is 135,206,235
    // red up, green up, blue up
    lowestFreq = 82;
    highestFreq = 127;
    r = ((freq - lowestFreq) * 65) / (highestFreq - lowestFreq) + 70;
    g = ((freq - lowestFreq) * 76) / (highestFreq - lowestFreq) + 130;
    b = ((freq - lowestFreq) * 55) / (highestFreq - lowestFreq) + 180;
  } else if (numbo === "3") {
    // green 0,128,0 to chartreuse 127,255,0
    // red up, green up, blue steady,
    lowestFreq = 127;
    highestFreq = 255;
    r = ((freq - lowestFreq) * 127) / (highestFreq - lowestFreq);
    g = ((freq - lowestFreq) * 127) / (highestFreq - lowestFreq) + 128;
    b = 0;
  } else if (numbo === "4") {
    // yellow 255,255,0 to orange 255,165,0
    // red steady, green down, blue steady
    lowestFreq = 255;
    highestFreq = 509;
    r = 255;
    b = 0;
    g = ((highestFreq - freq) * 90) / (highestFreq - lowestFreq) + 165;
  } else if (numbo === "5") {
    // salmon 250,128,114 to red 255,0,0
    // red up, green down, blue down
    lowestFreq = 509;
    highestFreq = 660; //998
    r = ((freq - lowestFreq) * 5) / (highestFreq - lowestFreq) + 250;
    b = ((highestFreq - freq) * 114) / (highestFreq - lowestFreq);
    g = ((highestFreq - freq) * 128) / (highestFreq - lowestFreq);
  }

  return `rgb(${r},${g},${b})`;
};

export { calculateColor };
