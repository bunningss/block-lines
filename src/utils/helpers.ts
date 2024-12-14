export function generateId(length: number) {
  const characters = "1234567890abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const getRandomPosition = (): { x: number; y: number } => ({
  x: Math.random() * (window.innerWidth - 150),
  y: Math.random() * (window.innerHeight - 150),
});
