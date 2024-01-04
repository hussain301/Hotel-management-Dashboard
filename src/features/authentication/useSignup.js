import {useMutation} from '@tanstack/react-query'
import { signupUser } from '../../services/apiAuth'
import { toast } from'react-hot-toast'


export const useSignup = () => {
    const { mutate: signup, isLoading } = useMutation({
        mutationFn: signupUser,
        onSuccess: (data) => {
           toast.success('User created successfully verify your email')
        }, 
        

    })
    return { signup, isLoading }
    }