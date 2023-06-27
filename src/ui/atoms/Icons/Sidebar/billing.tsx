interface Props {
  size: number;
  color: string;
}

function Billing({ size, color }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 24 24'
    >
      <rect width='18' height='13' x='3' y='6' stroke={color} strokeWidth='2' rx='2'></rect>
      <path stroke={color} strokeLinecap='round' strokeWidth='2' d='M7 15h.01M4 11h17'></path>
    </svg>
  );
}

export default Billing;
