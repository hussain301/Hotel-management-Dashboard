
import React from 'react'
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useQueryParams } from '../../hooks/useUrlParams';
import Empty from '../../ui/Empty';


const CabinTable = () => {
  const { cabins, isLoading } = useCabins()
  const [searchParams,] = useQueryParams()
  const filterValue = searchParams.get('discount') || 'all'
  let filteredCabins;

// 1) FILTER
  if (filterValue === 'all') filteredCabins = cabins
  if(filterValue === 'no-discount') filteredCabins = cabins?.filter(cabin => cabin.discount === 0)
  if (filterValue === 'with-discount') filteredCabins = cabins?.filter(cabin => cabin.discount > 0) 

  // 2) SORT
  const sortValue = searchParams.get('sortBy') || 'start-date-asc'
  const [field, order] = sortValue.split('-')
  const modifire = order === 'asc' ? 1 : -1
  filteredCabins = filteredCabins?.sort((a, b) => {
    if (field === 'name') return modifire * a.name.localeCompare(b.name)
    if (field === 'regularPrice') return modifire * (a.regularPrice - b.regularPrice)
    if (field === 'maxCapacity') return modifire * (a.maxCapacity - b.maxCapacity)
    return 0
  })

  if (isLoading) return <Spinner />

  if (!cabins.length) return <Empty resource={'cabin'}/>
  return (
<Menus>
    <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body data={filteredCabins} render={(cabin) => (
        <CabinRow key={cabin.id} cabin={cabin}  />
        )} /> 
      </Table>
    </Menus>
  )
}

export default CabinTable