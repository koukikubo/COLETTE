export function getPaginationRange(
  current: number,
  total: number,
  delta = 2,
): (number | "ellipsis")[] {
  const range: (number | "ellipsis")[] = [];

  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  // 先頭
  range.push(1);

  // 左の省略
  if (left > 2) {
    range.push("ellipsis");
  }

  // 中央
  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  // 右の省略
  if (right < total - 1) {
    range.push("ellipsis");
  }

  // 末尾
  if (total > 1) {
    range.push(total);
  }

  return range;
}
