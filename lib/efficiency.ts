import type { EfficiencyCategory } from "./data";

export function weightedMinutes(category: EfficiencyCategory) {
  return category.minutes * category.weight;
}

export function totalMinutes(categories: EfficiencyCategory[]) {
  return categories.reduce((sum, c) => sum + c.minutes, 0);
}

export function rawEfficiency(categories: EfficiencyCategory[]) {
  const active = categories[0]?.minutes ?? 0;
  const total = totalMinutes(categories);
  return total > 0 ? (active / total) * 100 : 0;
}

export function weightedEfficiency(categories: EfficiencyCategory[]) {
  const weighted = categories.reduce((sum, c) => sum + weightedMinutes(c), 0);
  const total = totalMinutes(categories);
  return total > 0 ? (weighted / total) * 100 : 0;
}

export function weightedShares(total: number, weights: number[]) {
  const weightSum = weights.reduce((sum, w) => sum + w, 0);
  const shares: number[] = [];
  let remaining = total;
  for (let i = 0; i < weights.length - 1; i++) {
    const share = Math.round(((total * weights[i]) / weightSum) * 10) / 10;
    shares.push(share);
    remaining = Math.round((remaining - share) * 10) / 10;
  }
  shares.push(remaining);
  return shares;
}

export function fmt(n: number) {
  const rounded = Math.round(n * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1).replace(/\.0$/, "");
}
