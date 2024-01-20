import React from 'react'
import AddBookings from '../features/bookings/AddBookings'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

const Createbookings = () => {
    return (
        <>
    <Heading as='h1'>Create a new booking</Heading>
            <AddBookings />
      </>
  )
}

export default Createbookings