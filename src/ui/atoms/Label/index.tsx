interface Props {
  children: any;
}

const LabelComponent = ({ children }: Props) => {
  return <label style={{ paddingBottom: '10px' }}>{children}</label>;
};

export default LabelComponent;
