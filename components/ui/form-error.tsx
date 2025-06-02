interface FormErrorProps {
  error: string | undefined;
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  return <>{error && <span className="text-red-500 text-xs">{error}</span>}</>;
};

export default FormError;
