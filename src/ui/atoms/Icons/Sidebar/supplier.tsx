interface Props {
  size: number;
  color: string;
}

function Supplier({ size, color }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 24 24'
    >
      <rect width='8' height='8' x='5' y='4' stroke={color} strokeWidth='2' rx='1.8'></rect>
      <path
        stroke={color}
        strokeWidth='2'
        d='M4 13.8A1.8 1.8 0 015.8 12h4.4a1.8 1.8 0 011.8 1.8V20H5.8A1.8 1.8 0 014 18.2v-4.4zM12 13.8a1.8 1.8 0 011.8-1.8h4.4a1.8 1.8 0 011.8 1.8v4.4a1.8 1.8 0 01-1.8 1.8H12v-6.2z'
      ></path>
      <path stroke={color} strokeLinecap='round' strokeWidth='2' d='M16 12v3M8 12v3M9 4v3'></path>
    </svg>
  );
}

export default Supplier;
