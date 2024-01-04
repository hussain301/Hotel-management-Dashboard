import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCurrentUser } from '../../services/apiAuth'
import toast from 'react-hot-toast'


export const useUpdateUser = () => {
    const queryClient = useQueryClient()
    const { mutate: updateUser, isLoading:isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: ({user}) => {
            // queryClient.invalidateQueries({queryKey:['user']})
            queryClient.setQueryData(['user'],user)
            toast.success('User Account Updated successfully')
        },
        onError:err=>toast.error(err.message)
    })
    return { updateUser, isUpdating }
}