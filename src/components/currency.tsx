
export default function Currency(props: { children: number, currency: string }) {
  return (
    <div>{props.currency} {Number(props.children)
      .toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</div>
  );
}
