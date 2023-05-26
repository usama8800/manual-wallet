export const symbol2Name = {
  btc: 'bitcoin',
  eth: 'ethereum',
} as { [key: string]: string };

export const name2Symbol = invertObject(symbol2Name);

function invertObject(obj: { [key: string]: string }) {
  const ret: { [key: string]: string } = {};
  for (const key in obj) {
    ret[obj[key]] = key;
  }
  return ret;
}

export type SliceStatus = 'idle' | 'pending' | 'rejected' | 'fulfilled';

export function classNames(
  definite?: (string | undefined)[],
  indefinite?: { [key: string]: boolean | string | undefined },
  styles?: { [key: string]: string; },
) {
  return [
    ...(definite?.filter(x => x) as string[] ?? []),
    ...Object.entries(indefinite ?? {}).filter(([_, val]) => val).map(([key, _]) => key)
  ].map(x => styles ? styles[x] : x).join(' ');
}
