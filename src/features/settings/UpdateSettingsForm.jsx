/** @format */

import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import useSettings from './useSettings';
import useUpdateSettings from './useUpdateSettings';

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { updateSettings, isUpdating } = useUpdateSettings();

  const updateHandler = (e, field) => {
    const value = e.target.value;
    if (!value) return;
    updateSettings({ [field]: value });
  };

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          disabled={isUpdating}
          onBlur={e => updateHandler(e, 'minBookingLength')}
          defaultValue={minBookingLength}
          type='number'
          id='min-nights'
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          disabled={isUpdating}
          onBlur={e => updateHandler(e, 'maxBookingLength')}
          defaultValue={maxBookingLength}
          type='number'
          id='max-nights'
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          disabled={isUpdating}
          onBlur={e => updateHandler(e, 'maxGuestsPerBooking')}
          defaultValue={maxGuestsPerBooking}
          type='number'
          id='max-guests'
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          disabled={isUpdating}
          onBlur={e => updateHandler(e, 'breakfastPrice')}
          defaultValue={breakfastPrice}
          type='number'
          id='breakfast-price'
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
