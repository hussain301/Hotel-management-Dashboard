
import PropsTypes from "prop-types";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useUpdateCabin from "./useUpdateCabin";

/**
 * A form component for creating or editing a cabin.
 * @param {Object} editCabin - An object containing the cabin data to be edited (optional).
 * @returns {JSX.Element} - A form element with input fields for cabin data.
 */

function CreateCabinForm({ editCabin = {} }) {
  const { id: editId, ...editValues } = editCabin
  const isEditSession = Boolean(editId)
  const { register, handleSubmit, reset, getValues, formState } = useForm(
    {defaultValues: isEditSession ? editValues : {}}
  )
  const { errors } = formState

  const { createCabin, isCreating } = useCreateCabin(reset)
  const {updateCabin , isEditing} = useUpdateCabin(reset)
  
 
const isWorking = isCreating || isEditing
  const submitHandler = data => {
    const image = typeof data.image === 'string' ? data.image : data.image[0]
    // const image = data.image instanceof File ? data.image[0] : data.image
    if (isEditSession) return updateCabin({ newCabinData: { ...data, image }, id: editId }, { onSuccess: () => reset() }) 
    else  createCabin({ ...data, image: image },{onSuccess:()=>reset()})
  }
  const errorHandler = (errors) => { console.log(errors) }

  return (
    <Form onSubmit={handleSubmit(submitHandler,errorHandler)}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input disabled={isWorking} type="text" id="name" {...register("name",{
          required:'this field is required'
        })} />
        
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register("maxCapacity",{
          required:'this field is required',
          min:{
            value:1,
            message:'capacity must be greater than 0'}
        })} />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register("regularPrice",{
          required:'this field is required',
          min:{
            value:1,
            message:'price must be greater than 0'
          }
        })}/>
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register("discount",{ 
          required:'this field is required',
          validate: value => +getValues().regularPrice >= value || 'discount must be less than regular price'
          
          })} />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register("description",{
          required:'this field is required'
        })}/>
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput id="image" accept="image/*" {...register("image", {
          required:isEditSession ? false : 'this field is required'
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isWorking} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Edit cabin' : 'Add New Cabin'}</Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  editCabin: PropsTypes.object,
};
export default CreateCabinForm;
