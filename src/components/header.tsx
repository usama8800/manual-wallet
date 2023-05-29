import { ReactNode } from 'react';

export default function Header(props: {
  title?: string,
  children?: ReactNode,
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
      {props.title && (
        <span style={{
          fontSize: '2rem',
          fontWeight: 700,
        }}>{props.title}</span>
      )}
      {props.children && (props.children)}
      {props.trailing && (props.trailing)}
    </div>
  );
}
