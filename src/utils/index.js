export const { hasOwnProperty } = Object.prototype;

export function getProperty(from, key, resolver = {}) {
  return from && hasOwnProperty.call(from, key) ? from[key] : resolver;
}
