export function formatPrice(value: number | string) {
  const num = Number(value);
  if (isNaN(num)) return String(value);
  const val = num / 100;
  return new Intl.NumberFormat("fr-FR").format(val);
}
