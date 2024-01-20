import { useForm,Controller } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Checkbox from '../../ui/Checkbox';

function BookingForm() {
  
    const {
        register,
        handleSubmit,
   
        control,
        reset,
        formState: { errors },
    } = useForm();
    const statusOptions = [
  { value: 'checked-in', label: 'Checked In' },
  { value: 'checked-out', label: 'Checked Out' },
  { value: 'unconfirmed', label: 'Unconfirmed' }
];



    const onSubmit = data => {
        const {
            startDate,
            endDate,
            numberOfGuests,
            numberOfNightsStay,
            cabinPrice,
            breakfastPrice,
            status,
            includeBreakfast,
            isPaid,
            cabinId,
            guestId,
            totalPrice,
            observations,
        } = data;
     
        console.log(data);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow
                label='Start Date'
                error={errors.startDate && 'Start Date is required'}
            >
                <Input
                    id='startDate'
                    // disabled={isLoading}
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
                    // disabled={isLoading}
                    type='date'
                    {...register('endDate', { required: true })}
                />
            </FormRow>

            <FormRow
                label='Number of Guests'
                error={errors.numberOfGuests && 'Number of Guests is required'}
            >
                <Input
                    id='numberOfGuests'
                    // disabled={isLoading}
                    type='number'
                    {...register('numberOfGuests', { required: true })}
                />
            </FormRow>

            <FormRow
                label='Number of Nights Stay'
                error={errors.numberOfNightsStay && 'Number of Nights Stay is required'}
            >
                <Input
                    id='numberOfNightsStay'
                    // disabled={isLoading}
                    type='number'
                    {...register('numberOfNightsStay', { required: true })}
                />
            </FormRow>

            <FormRow
                label='Cabin Price'
                error={errors.cabinPrice && 'Cabin Price is required'}
            >
                <Input
                    id='cabinPrice'
                    // disabled={isLoading}
                    type='number'
                    {...register('cabinPrice', { required: true })}
                />
            </FormRow>

            <FormRow
                label='Breakfast Price'
                error={errors.breakfastPrice && 'Breakfast Price is required'}
            >
                <Input
                    id='breakfastPrice'
                    // disabled={isLoading}
                    type='number'
                    {...register('breakfastPrice', { required: true })}
                />
            </FormRow>

            <FormRow
                label='Status'
                error={errors.status && 'Status is required'}
            >
                 <Controller
        name="status" // the name of your field that will be in the form data
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select options={statusOptions} {...field} />
        )}
      />
            </FormRow>

            <FormRow>
                <Controller
        name="includeBreakfast" // the name of your field that will be in the form data
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Checkbox
          {...field}
          value = {field.value?true:false}
                >
                    Include Breakfast
                </Checkbox>
        )}
      />
                
            </FormRow>

            <FormRow>
                <Controller
        name="isPaid" // the name of your field that will be in the form data
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Checkbox
          {...field}
          value = {field.value?true:false}
                >
                    is Paid
                </Checkbox>
        )}
      />
            </FormRow>

            <FormRow
                label='Cabin ID'
                error={errors.cabinId && 'Cabin ID is required'}
            >
                <Input
                    id='cabinId'
                    // disabled={isLoading}
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
                    // disabled={isLoading}
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
                    // disabled={isLoading}
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
                    // disabled={isLoading}
                    type='text'
                    {...register('observations', { required: true })}
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
