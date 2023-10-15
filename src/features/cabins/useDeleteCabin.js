import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins"


const useDeleteCabin = () => {
    const queryClient = useQueryClient()
    const { mutate:deleteCabin, isLoading: isDeleting } = useMutation({
        mutationFn: deleteCabinApi,
        onSuccess: () => {
            queryClient.invalidateQueries('cabins')
            toast.success('Cabin Deleted successfully')
        },
        onError: err => toast.error(err.message)
    })
    return { deleteCabin, isDeleting }
}

export default useDeleteCabin