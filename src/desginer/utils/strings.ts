export function sanitizeValue(value: string): string {
  return value.replace(/<\/?[^>]+(>|$)/g, '');
}

export function toExternalLink(v: string): string {
  const prefix = 'https://';
  return v.includes(prefix) ? v : `${prefix}${v}`;
}
