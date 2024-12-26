interface LoaderProps {
  mode?: "light" | "dark";
}

const Logo: React.FC<LoaderProps> = ({ mode = "dark" }) => {
  return <>{mode}</>;
};

export default Logo;
