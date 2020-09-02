export function get<ValueType>(
  id: string,
  map: { [id: string]: ValueType }
): ValueType | undefined {
  return map[id];
}
