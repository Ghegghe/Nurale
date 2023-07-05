interface Props {
  size: number;
  color: string;
}

function MagnifyingGlass({ size, color }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill={color}
      viewBox='0 0 48 48'
    >
      <path d='M20.5 6C12.516 6 6 12.516 6 20.5S12.516 35 20.5 35c3.273 0 6.289-1.107 8.72-2.95l9.366 9.364a2 2 0 102.828-2.828l-9.363-9.365C33.893 26.789 35 23.773 35 20.5 35 12.516 28.484 6 20.5 6zm0 4A10.47 10.47 0 0131 20.5c0 2.796-1.086 5.32-2.852 7.197a2 2 0 00-.447.448A10.457 10.457 0 0120.5 31 10.47 10.47 0 0110 20.5 10.47 10.47 0 0120.5 10z'></path>
    </svg>
  );
}

export default MagnifyingGlass;
