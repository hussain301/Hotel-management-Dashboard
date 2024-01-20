/** @format */

import { useForm, Controller } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Checkbox from '../../ui/Checkbox';
import { useAddBooking } from './addBooking';

function BookingForm() {
  const {
    register,
    handleSubmit,

    control,
    reset,
    formState: { errors },
  } = useForm();
  const { addBooking, isAddingBooking } = useAddBooking();
  const statusOptions = [
    { value: 'checked-in', label: 'Checked In' },
    { value: 'checked-out', label: 'Checked Out' },
    { value: 'unconfirmed', label: 'Unconfirmed' },
  ];

  const onSubmit = data => {
    data.startDate = new Date(data.startDate).toISOString();
    data.endDate = new Date(data.endDate).toISOString();
    addBooking(data)
    console.log(data);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label='Start Date'
        error={errors.startDate && 'Start Date is required'}
      >
        <Input
          id='startDate'
          disabled={isAddingBooking}
          type='date'
          {...register('startDate', { required: true })}
        />
      </FormRow>
      <FormRow
        label='End Date'
        error={errors.endDate && 'End Date is required'}
      >
        <Input
          id='endDate'
          disabled={isAddingBooking}
          type='date'
          {...register('endDate', { required: true })}
        />
      </FormRow>
      <FormRow
        label='Number of Guests'
        error={errors.numGuests && 'Number of Guests is required'}
      >
        <Input
          id='numGuests'
          disabled={isAddingBooking}
          type='number'
          {...register('numGuests', { required: true })}
        />
      </FormRow>
      <FormRow
        label='Number of Nights Stay'
        error={errors.numNights && 'Number of Nights Stay is required'}
      >
        <Input
          id='numberOfNightsStay'
          disabled={isAddingBooking}
          type='number'
          {...register('numNights', { required: true })}
        />
      </FormRow>
      <FormRow
        label='Cabin Price'
        error={errors.cabinPrice && 'Cabin Price is required'}
      >
        <Input
          id='cabinPrice'
          disabled={isAddingBooking}
          type='number'
          {...register('cabinPrice', { required: true })}
        />
      </FormRow>
      <FormRow
        label='Breakfast Price'
        error={errors.extrasPrice && 'Breakfast Price is required'}
      >
        <Input
          id='breakfastPrice'
          disabled={isAddingBooking}
          type='number'
          {...register('extrasPrice', { required: true })}
        />
      </FormRow>
      <FormRow
        label='Status'
        error={errors.status && 'Status is required'}
      >
        <Controller
          name='status' // the name of your field that will be in the form data
          control={control}
          defaultValue=''
          render={({ field }) => (
            <Select
              options={statusOptions}
              {...field}
            />
          )}
        />
      </FormRow>
      <FormRow
        label='Cabin ID'
        error={errors.cabinId && 'Cabin ID is required'}
      >
        <Input
          id='cabinId'
          disabled={isAddingBooking}
          type='text'
          {...register('cabinId', { required: true })}
        />
      </FormRow>
      <FormRow
        label='Guest ID'
        error={errors.guestId && 'Guest ID is required'}
      >
        <Input
          id='guestId'
          disabled={isAddingBooking}
          type='text'
          {...register('guestId', { required: true })}
        />
      </FormRow>
      <FormRow
        label='Total Price'
        error={errors.totalPrice && 'Total Price is required'}
      >
        <Input
          id='totalPrice'
          disabled={isAddingBooking}
          type='number'
          {...register('totalPrice', { required: true })}
        />
      </FormRow>
      <FormRow
        label='Observations'
        error={errors.observations && 'Observations is required'}
      >
        <Input
          id='observations'
          disabled={isAddingBooking}
          type='text'
          {...register('observations', { required: true })}
        />
      </FormRow>
      <FormRow>
        <Controller
          name='isPaid' // the name of your field that will be in the form data
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <Checkbox
              {...field}
              value={field.value ? true : false}
            >
              is Paid
            </Checkbox>
          )}
        />
      </FormRow>{' '}
      <FormRow>
        <Controller
          name='hasBreakfast' // the name of your field that will be in the form data
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <Checkbox
              {...field}
              value={field.value ? true : false}
            >
              Include Breakfast
            </Checkbox>
          )}
        />
      </FormRow>
      <FormRow>
        <Button
          variation='secondary'
          type='reset'
        >
          Cancel
        </Button>
        <Button type='submit'>Submit Booking</Button>
      </FormRow>
    </Form>
  );
}

export default BookingForm;
