/** @format */

import React from 'react';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';
import SortBy from '../../ui/SortBy';

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField='discount'
        options={[
          { label: 'All', value: 'all' },
          { label: 'With discount', value: 'with-discount' },
          { label: 'No Discount', value: 'no-discount' },
        ]}
      />

      <SortBy options={[
        { label: 'Sort by name (A-Z)', value: 'name-asc' },
        { label: 'Sort by name (Z-A)', value: 'name-desc' },
        { label: 'sort by price (low to high)', value: 'regularPrice-asc' },
        { label: 'Sort by price (high to low)', value: 'regularPrice-desc' },
        { label: 'sort by capacity (low to high)', value: 'maxCapacity-asc' },
        { label: 'Sort by capacity (high to low)', value: 'maxCapacity-desc' },


      ]} />
    </TableOperations>
  );
};

export default CabinTableOperations;
