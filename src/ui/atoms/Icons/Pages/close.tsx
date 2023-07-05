interface Props {
  size: number;
  color: string;
}

function Close({ size, color }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        stroke={color}
        strokeLinecap='square'
        strokeLinejoin='round'
        strokeWidth='2.2'
        d='M18 6L6 18M6 6l12 12'
      ></path>
    </svg>
  );
}

export default Close;
