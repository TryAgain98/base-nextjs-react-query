interface IProps {
  children: React.ReactNode;
}

function Tag({ children }: IProps) {
  return (
    <div className="bg-primary text-white text-sm text-center px-2  rounded">
      <span className="text-xs">{children}</span>
    </div>
  );
}

export default Tag;
