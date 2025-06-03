type AuthInputConfig = {
  label: string
  name: string
  type: string
  placeholder: string
  required: boolean
  showOnSignup: boolean
}
export const AUTH_INPUT_CONFIG: AuthInputConfig[] = [
  {
    label: 'First name',
    name: 'firstName',
    type: 'text',
    placeholder: 'Roger',
    required: true,
    showOnSignup: true,
  },
  {
    label: 'Last name',
    name: 'lastName',
    type: 'text',
    placeholder: 'Bannister',
    required: true,
    showOnSignup: true,
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'roger.bannister@email.com',
    required: true,
    showOnSignup: false, // This field is shown in both signup and login
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'minimum 6 characters',
    required: true,
    showOnSignup: false, // This field is shown in both signup and login
  },
  {
    label: 'Confirm password',
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'confirm password',
    required: true,
    showOnSignup: true,
  },
]
