export interface InputTextFieldProps {
  label?: string
  name: string
  type: string
  placeholder?: string
  value?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  error?: boolean
  helperText?: string
  adornment?: React.ReactNode
  required?: boolean
  disabled?: boolean
  className?: string
  intake?: boolean
  subtitle?: string
}

const inputClasses =
  'p-2 rounded-lg h-12 border-2 focus:outline-none focus:border-dark-green'

const AuthInput = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  adornment,
  required,
  disabled,
  className,
  intake,
  subtitle,
}: InputTextFieldProps) => {
  return (
    <div className="flex w-full flex-col">
      {label && <label htmlFor={name}>{label}</label>}
      {intake && (
        <p className="text-sm font-thin">
          <em>{subtitle}</em>
        </p>
      )}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${inputClasses} ${className} ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        required={required}
        disabled={disabled}
      />
      {adornment && (
        <span className="absolute inset-y-0 right-96 flex cursor-pointer items-center pr-3">
          {adornment}
        </span>
      )}

      {error && <p className="text-xs italic text-red-500">{helperText}</p>}
    </div>
  )
}

export default AuthInput
