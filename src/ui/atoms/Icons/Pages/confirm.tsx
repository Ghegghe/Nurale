interface Props {
  size: number;
  color: string;
}

function Confirm({ size, color }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 32 32'
    >
      <path stroke={color} strokeWidth='3' d='M6.667 18.667l5.333 4L24 8'></path>
    </svg>
  );
}

export default Confirm;
