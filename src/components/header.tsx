import { ReactNode } from 'react';

export default function Header(props: {
  title: string,
  trailing?: ReactNode | ReactNode[],
}) {
  return (
    <div style={{
      margin: '40px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      userSelect: 'none',
    }}>
      <span style={{
        fontSize: '2rem',
        fontWeight: 700,
      }}>{props.title}</span>
      {props.trailing && (props.trailing)}
    </div>
  );
}
