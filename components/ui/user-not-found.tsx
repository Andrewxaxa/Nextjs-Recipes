import { SignIn } from "@clerk/nextjs";

interface UserNotFoundProps {
  title: string;
}

const UserNotFound: React.FC<UserNotFoundProps> = ({ title }) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>
      <p className="text-center text-red-500">
        User not found. Please log in again.
      </p>
      <SignIn />
    </div>
  );
};

export default UserNotFound;
