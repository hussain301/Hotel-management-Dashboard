/** @format */

import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignup } from './useSignup';

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = data => {
    const { fullName, email, password } = data;
    signup({ fullName, email, password }, { onSettled: () => reset() });
  };
  if (isLoading) return <p>Loading...</p>;
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label='Full name'
        error={errors.fullName && 'Full name is required'}
      >
        <Input
          id='fullName'
          disabled={isLoading}
          type='text'
          {...register('fullName', { required: true })}
        />
      </FormRow>

      <FormRow
        label='Email address'
        error={errors.email && 'Email is required'}
      >
        <Input
          id='email'
          disabled={isLoading}
          type='email'
          {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
        />
      </FormRow>

      <FormRow
        label='Password (min 8 characters)'
        error={errors.password && 'Password is required'}
      >
        <Input
          id='password'
          disabled={isLoading}
          type='password'
          {...register('password', { required: true, minLength: 6 })}
        />
      </FormRow>

      <FormRow
        label='Repeat password'
        error={errors.passwordConfirm && 'Please confirm your password'}
      >
        <Input
          id='repeat-Password'
          disabled={isLoading}
          type='password'
          {...register('passwordConfirm', {
            required: true,
            validate: value =>
              value === watch('password') || 'The passwords do not match',
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation='secondary'
          type='reset'
        >
          Cancel
        </Button>
        <Button type='submit'>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
