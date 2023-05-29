import { CSSProperties } from 'react';

export default function Icon(props: {
  icon: keyof typeof svgs, size?: number,
  className?: string, style?: CSSProperties,
  onClick?: () => void,
}) {
  const size = props.size ?? 30;
  return (
    <div
      className={props.className}
      style={{
        width: size,
        height: size,
        ...(props.style ?? {}),
      }}
      onClick={props.onClick}
    >{svgs[props.icon as keyof typeof svgs]}</div>
  );
}

const svgs = {
  menu: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <circle cx="256" cy="256" r="48" fill="currentColor" />
    <circle cx="256" cy="416" r="48" fill="currentColor" />
    <circle cx="256" cy="96" r="48" fill="currentColor" />
  </svg>,
  undelete: <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" enable-background="new 0 0 52 52" xmlSpace="preserve">
    <g fill='currentColor'>
      <path d="M41.5,20h-31C9.7,20,9,20.7,9,21.5V45c0,2.8,2.2,5,5,5h24c2.8,0,5-2.2,5-5V21.5C43,20.7,42.3,20,41.5,20z
    M26,46v-4c3.3,0,6-2.7,6-6s-2.7-6-6-6c-1.6,0-3.1,0.7-4.2,1.8c0.9,0.9,1.8,1.8,2.4,2.4c0.3,0.3,0.1,0.9-0.4,0.9h-7.3
   c-0.3,0-0.5-0.2-0.5-0.5v-7.3c0-0.4,0.5-0.7,0.9-0.4c0.5,0.5,1.3,1.3,2.1,2.1c1.9-1.8,4.4-2.9,7.1-2.9c5.5,0,10,4.5,10,10
   S31.5,46,26,46z"/>
      <path d="M45.5,10H33V6c0-2.2-1.8-4-4-4h-6c-2.2,0-4,1.8-4,4v4H6.5C5.7,10,5,10.7,5,11.5v3C5,15.3,5.7,16,6.5,16h39
   c0.8,0,1.5-0.7,1.5-1.5v-3C47,10.7,46.3,10,45.5,10z M29,10h-6V7c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V10z"/>
    </g>
  </svg>,
  delete: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
    <path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 112h352" />
    <path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
  </svg>,
  eye: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
    <circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" />
  </svg>,
  eyeOff: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="currentColor" d="M432 448a15.92 15.92 0 01-11.31-4.69l-352-352a16 16 0 0122.62-22.62l352 352A16 16 0 01432 448zM255.66 384c-41.49 0-81.5-12.28-118.92-36.5-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 00.14-2.94L93.5 161.38a2 2 0 00-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0075.8-12.58 2 2 0 00.77-3.31l-21.58-21.58a4 4 0 00-3.83-1 204.8 204.8 0 01-51.16 6.47zM490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 00-74.89 12.83 2 2 0 00-.75 3.31l21.55 21.55a4 4 0 003.88 1 192.82 192.82 0 0150.21-6.69c40.69 0 80.58 12.43 118.55 37 34.71 22.4 65.74 53.88 89.76 91a.13.13 0 010 .16 310.72 310.72 0 01-64.12 72.73 2 2 0 00-.15 2.95l19.9 19.89a2 2 0 002.7.13 343.49 343.49 0 0068.64-78.48 32.2 32.2 0 00-.1-34.78z" />
    <path fill="currentColor" d="M256 160a95.88 95.88 0 00-21.37 2.4 2 2 0 00-1 3.38l112.59 112.56a2 2 0 003.38-1A96 96 0 00256 160zM165.78 233.66a2 2 0 00-3.38 1 96 96 0 00115 115 2 2 0 001-3.38z" />
  </svg>,
  dice: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M448 341.37V170.61A32 32 0 00432.11 143l-152-88.46a47.94 47.94 0 00-48.24 0L79.89 143A32 32 0 0064 170.61v170.76A32 32 0 0079.89 369l152 88.46a48 48 0 0048.24 0l152-88.46A32 32 0 00448 341.37z" />
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M69 153.99l187 110 187-110M256 463.99v-200" />
    <ellipse cx="256" cy="152" rx="24" ry="16" fill="currentColor" />
    <ellipse cx="208" cy="296" rx="16" ry="24" fill="currentColor" />
    <ellipse cx="112" cy="328" rx="16" ry="24" fill="currentColor" />
    <ellipse cx="304" cy="296" rx="16" ry="24" fill="currentColor" />
    <ellipse cx="400" cy="240" rx="16" ry="24" fill="currentColor" />
    <ellipse cx="304" cy="384" rx="16" ry="24" fill="currentColor" />
    <ellipse cx="400" cy="328" rx="16" ry="24" fill="currentColor" />
  </svg>,
  add: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 112v288M400 256H112" /></svg>,
  btc: <svg fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ff9b22" d="m10 20c5.5228 0 10-4.4772 10-10 0-5.52285-4.4772-10-10-10-5.52285 0-10 4.47715-10 10 0 5.5228 4.47715 10 10 10z" />
    <path fill="#fff" d="m14.4931 8.7625c.1963-1.31-.8018-2.01437-2.1656-2.48437l.4425-1.77501-1.08-.26874-.4312 1.72812c-.2838-.07125-.575-.1375-.8657-.20375l.4344-1.73937-1.07998-.26938-.4425 1.77437c-.235-.05375-.46625-.10624-.69-.16249l.00125-.00563-1.49-.37188-.2875 1.15376s.80188.18375.785.195c.4375.10937.51625.39874.50313.62874l-1.21188 4.86183c-.05375.1325-.18938.3319-.49563.2563.01125.0156-.78499-.1956-.78499-.1956l-.53626 1.2362 1.40625.3507c.26125.0656.5175.1343.76938.1987l-.44687 1.795 1.07937.2687.4425-1.775c.295.0794.58125.1532.86125.2232l-.44125 1.7675 1.08.2687.44683-1.7912c1.8425.3487 3.2275.2081 3.8107-1.4581.47-1.3413-.0232-2.1157-.9925-2.62.7062-.1625 1.2375-.62692 1.3793-1.5863zm-2.4687 3.4613c-.3331 1.3418-2.5925.6162-3.32501.4343l.59376-2.3781c.73245.1831 3.08065.545 2.73125 1.9438zm.3344-3.48067c-.3044 1.22062-2.1844.6-2.79378.44812l.53748-2.15625c.6094.15187 2.5738.435 2.2563 1.70813z" />
  </svg>,
  eth: <svg fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="m10 20c5.5228 0 10-4.4772 10-10 0-5.52285-4.4772-10-10-10-5.52285 0-10 4.47715-10 10 0 5.5228 4.47715 10 10 10z" fill="#473bcb" />
    <g fill="#fff">
      <path d="m9.99975 3.75v4.62075l3.90545 1.74515z" />
      <path d="m9.99975 3.75-3.906 6.3659 3.906-1.74515z" />
      <path d="m9.99975 13.1103v3.1397l3.90815-5.4069z" />
      <path d="m9.99975 16.25v-3.1397l-3.906-2.2672z" />
      <path d="m9.99975 12.3836 3.90545-2.2677-3.90545-1.7441z" />
      <path d="m6.09375 10.1159 3.906 2.2677v-4.0118z" />
    </g>
  </svg>,
  none: <svg></svg>
};
