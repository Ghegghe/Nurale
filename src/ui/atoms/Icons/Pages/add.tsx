interface Props {
  size: number;
  rotation: string;
}

function Add({ size, rotation }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 36 36'
      style={{ rotate: rotation }}
    >
      <path stroke='#fff' strokeLinecap='round' strokeWidth='3' d='M18 9v18M27 18H9'></path>
    </svg>
  );
}

export default Add;
