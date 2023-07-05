interface Props {
  size: number;
}

function LeftArrow({ size }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 14 15'
    >
      <path
        fill='#fff'
        d='M.5 8.366a1 1 0 010-1.732L11.75.139a1 1 0 011.5.866v12.99a1 1 0 01-1.5.866L.5 8.366z'
      ></path>
    </svg>
  );
}

export default LeftArrow;
