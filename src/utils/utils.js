export function getCounter(duration) {
  const seconds = parseInt(duration % 60);
  const minutes = parseInt(duration / 60);

  return `${normalizeToTen(minutes)}:${normalizeToTen(seconds)}`;

  function normalizeToTen(value) {
    return value < 10 ? `0${value}` : value;
  }
}
