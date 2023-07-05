interface Props {
  size: number;
  color: string;
}

function Home({ size, color }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      width={size}
      height={size}
    >
      <circle cx='12' cy='12' r='9' stroke={color} stroke-width='2'></circle>
      <path
        stroke={color}
        stroke-linecap='round'
        stroke-width='2'
        d='M16.5 12h-4.25a.25.25 0 01-.25-.25V8.5'
      ></path>
    </svg>
  );
}

export default Home;
