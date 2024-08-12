export default function useMapper<E>(EnumMap:any) {
  const result = Object.keys(EnumMap) as (keyof typeof EnumMap)[];

  return result
}