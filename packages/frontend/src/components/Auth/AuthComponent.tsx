import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AUTH_INPUT_CONFIG } from '../../constants/authInputConfig'
import { authenticateUser, clearError } from '../../redux/slices/authSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import AuthInput from '../Input/AuthInput'

const AuthComponent = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loading, error, data } = useAppSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
  })
  const [isSignup, setIsSignup] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const method: string = isSignup ? 'signup' : 'login'
  const isConfirmPasswordDisabled = formData.password.length < 6

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)

    const { email, password, firstName, lastName } = formData

    dispatch(
      authenticateUser({ email, password, method, firstName, lastName })
    ).then(() => {
      if (data && data.auth) {
        navigate('/')
      }
    })
  }

  const handleFormChange = () => {
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
    })
    setFormSubmitted(false)
    dispatch(clearError())
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const renderInput = (
    index: string,
    label: string,
    name: string,
    type: string,
    placeholder: string,
    required: boolean = true
  ) => (
    <div key={index + '-' + label} className="mx-auto w-2/3 min-w-32">
      <AuthInput
        label={label}
        name={name}
        type={type}
        placeholder={placeholder}
        value={formData[name as keyof typeof formData]}
        onChange={handleInputChange}
        required={required}
        error={formSubmitted && !formData[name as keyof typeof formData]}
        helperText={`${label} is required`}
        disabled={name === 'confirmPassword' && isConfirmPasswordDisabled}
      />
    </div>
  )

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form
        id={method}
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center justify-center gap-4 text-white"
        noValidate={true}
      >
        {AUTH_INPUT_CONFIG.filter(
          (input) => !input.showOnSignup || (input.showOnSignup && isSignup)
        ).map((input, index) =>
          renderInput(
            index.toString(),
            input.label,
            input.name,
            input.type,
            input.placeholder,
            input.required
          )
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : isSignup ? 'Sign Up' : 'Login'}
        </button>
      </form>
      <button
        className="mt-4 px-4 py-2"
        type="button"
        onClick={() => {
          handleFormChange()
          setIsSignup((prev) => !prev)
        }}
      >
        {isSignup ? 'Switch to Login' : 'Switch to Sign Up'}
      </button>
      {error && formSubmitted && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default AuthComponent
