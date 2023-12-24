import {useMutation, useQueryClient } from "@tanstack/react-query"
import { updateSetting } from "../../services/apiSettings"
import toast from "react-hot-toast"

const useUpdateSettings = () => {
    const queryClient = useQueryClient()
    const {mutate:updateSettings, isLoading:isUpdating} = useMutation({
        mutationFn: updateSetting,
        onSuccess: () => {
            toast.success('Settings updated successfully')
            queryClient.invalidateQueries({
                queryKey: ['settings']
            })
        },
        onError: error => toast.error(error.message)
    })
    return {updateSettings, isUpdating}    

}

export default useUpdateSettings