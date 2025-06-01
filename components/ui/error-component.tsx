import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
}

const ErrorComponent: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-3xl font-bold mb-4">Wystąpił błąd</h1>
      <p className="mb-2 text-red-600">{error.message}</p>
      <Link
        href="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Powrót na stronę główną
      </Link>
    </div>
  );
};

export default ErrorComponent;
