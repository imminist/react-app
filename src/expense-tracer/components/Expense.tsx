import { FormEvent, useState } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  description: z
    .string()
    .min(3, { message: 'Name must at least 3 characters' }),
  amount: z
    .number({ invalid_type_error: 'Age field is required' })
    .min(18, { message: 'Age must be at least 18' }),
})

type FormData = z.infer<typeof schema>

const Expense = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) })
  const onSubmit = (data: FieldValues) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Description
        </label>
        <input
          {...register('description')}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && <p className="text-danger">{errors.name.message}</p>}
        {errors.description?.type === 'minLength' && (
          <p className="text-danger">The name must be at least 3 characters.</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register('amount', { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
      </div>
      <button disabled={!isValid} className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  )
}

export default Expense
