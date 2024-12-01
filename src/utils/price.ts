export function formatPrice(price?: number): string {
  return Number(price)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
