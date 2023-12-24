import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";


const useSettings = () => {
    const {error,isLoading,data:settings} = useQuery({
        queryKey: ['settings'],
        queryFn: () => getSettings(),
    })

    return { error, isLoading, settings }
}
    
export default useSettings;
