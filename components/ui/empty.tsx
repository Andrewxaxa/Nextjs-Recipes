import { emptyIcon } from "./icons";

interface EmptyProps {
  message: string;
}

const Empty: React.FC<EmptyProps> = ({ message }) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-400">
      {emptyIcon}
      <span className="text-lg">{message}</span>
    </div>
  );
};

export default Empty;
