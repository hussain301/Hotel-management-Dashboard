import React from 'react'
import Select from './Select'
import { useQueryParams } from '../hooks/useUrlParams';

const SortBy = ({ options }) => {

    const [searchParams,setQueryParam] = useQueryParams();

    const sortBy = searchParams.get('sortBy') || ''

    const handleChange = (e) => setQueryParam('sortBy', e.target.value)
    

    

  return (
    <Select options={options} onChange={handleChange} type="white" value={sortBy}/>
  )
}

export default SortBy