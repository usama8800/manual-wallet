import ListItem from './listItem';

export default function Button(props: {
  children: string,
  icon?: string,
  disabled?: boolean,
  onClick?: () => void
}) {
  return (
    <ListItem
      style={{
        display: 'flex',
        justifyContent: 'center',
        ...(props.disabled ? { color: 'rgb(var(--foreground-2-rgb))' } : {}),
        userSelect: 'none',
      }}
      compact
      hoverable={!props.disabled}
      onClick={props.disabled ? () => { } : props.onClick}
    >{props.children}</ListItem>
  );
}
