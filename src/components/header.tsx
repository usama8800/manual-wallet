import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Icon from './icon';

export default function Header(props: {
  title?: string,
  children?: ReactNode,
  trailing?: ReactNode | ReactNode[],
  back?: string,
}) {
  const router = useRouter();
  return (
    <div style={{
      margin: '40px 0',
      display: 'flex',
      alignItems: 'center',
      userSelect: 'none',
    }}>
      {props.back && (
        <Icon
          className='icon'
          icon={'back'}
          onClick={() => router.push(props.back!)}
          style={{
            marginRight: 20,
          }}
        ></Icon>
      )}
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
