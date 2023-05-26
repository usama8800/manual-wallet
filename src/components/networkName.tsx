import { symbol2Name } from '@/lib/utils';
import { CSSProperties } from 'react';

export default function NetworkName(props: { symbol: string, style?: CSSProperties }) {
  return (
    <div style={{
      textTransform: 'uppercase',
      fontSize: '0.75rem',
      color: 'rgb(var(--foreground-2-rgb))',
      ...props.style,
    }}>{symbol2Name[props.symbol]}</div>
  );
}
