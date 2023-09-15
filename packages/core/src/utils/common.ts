export function randomShardId(): number {
  const min = 1;
  const max = 20;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getShardIds(): number[] {
  return Array.from({ length: 20 }, (_, i) => i + 1);
}
