
export default function Header(props: { title: string }) {
  return (
    <div style={{
      margin: '40px 0'
    }}>
      <span style={{
        fontSize: '2rem',
        fontWeight: 700,
      }}>{props.title}</span>
    </div>
  );
}
