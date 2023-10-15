import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEditCabin } from "../../services/apiCabins"
import toast from "react-hot-toast"

const useUpdateCabin = () => {
    const queryClient = useQueryClient()
    const { mutate: updateCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) => (createEditCabin(newCabinData, id)),
        onSuccess: () => {
            queryClient.invalidateQueries('cabins')
            toast.success('Cabin edited successfully')
        
        },
        onError: err => toast.error(err.message)
    })
    return { updateCabin, isEditing }
    
}

export default useUpdateCabin