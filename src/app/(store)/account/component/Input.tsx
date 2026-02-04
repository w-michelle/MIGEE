import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  disabled?: boolean;
  defaultValue?: string;
}

export const Input = ({
  type = "text",
  label,
  id,
  placeholder,
  register,
  disabled,
  defaultValue,
}: InputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm"
      >
        {label}
      </label>
      <input
        {...register}
        type={type}
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`outline-none text-sm border py-2 px-3 w-full rounded-sm mt-2
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={disabled}
      />
    </div>
  );
};
