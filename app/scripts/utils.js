export function randInt (min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function randFloat (min, max) {
  return Math.random() * (max - min) + min;
}
