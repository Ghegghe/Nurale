interface Props {
  size: number;
  color: string;
  isOpen: boolean;
}

function Sublist({ size, color, isOpen }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 11 9'
    >
      <path
        stroke={color}
        d={
          isOpen
            ? 'M5.067.75a.5.5 0 01.866 0L9.83 7.5a.5.5 0 01-.433.75H1.603a.5.5 0 01-.433-.75L5.067.75z'
            : 'M5.933 8.25a.5.5 0 01-.866 0L1.17 1.5a.5.5 0 01.433-.75h7.794a.5.5 0 01.433.75L5.933 8.25z'
        }
      ></path>
    </svg>
  );
}

export default Sublist;
