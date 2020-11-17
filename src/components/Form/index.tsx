import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { getAuth } from '@/api'

interface FormData {
  name: string
  email: string
  password: string
  terms: boolean
}

const Form = () => {
  const [submitting, setSubmitting] = useState<boolean>(false)
  const { register, handleSubmit, errors } = useForm<FormData>({
    defaultValues: {
      name: 'Leigh',
      email: 'email@email.com',
      password: 'P@ssw0rd!',
      terms: true
    }
  })

  const onSubmit = async (data: any) => {
    setSubmitting(true)
    if (submitting) return false
    console.log('Form data', data)

    const response = await getAuth()
    setTimeout(() => setSubmitting(false), 2000)
    console.log('API response', response)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">
          NAME
          <input
            type="text"
            name="name"
            id="name"
            ref={register({ required: true })}
          />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          EMAIL
          <input
            type="email"
            name="email"
            id="email"
            ref={register({ required: true })}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          PASSWORD
          <input
            type="password"
            name="password"
            id="password"
            ref={register({
              required: true,
              minLength: { value: 8, message: 'at least 8 characters' },
              validate: value => {
                return (
                  [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every(pattern =>
                    pattern.test(value)
                  ) || 'must include lower, upper, number, and special chars'
                )
              }
            })}
          />
        </label>
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <div>
        <label htmlFor="terms">
          You must agree
          <input
            type="checkbox"
            name="terms"
            id="terms"
            ref={register({ required: true })}
          />
        </label>
      </div>

      <input type="submit" disabled={submitting} />
    </form>
  )
}

export default Form
