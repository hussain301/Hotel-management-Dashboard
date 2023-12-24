
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CabinTable from "../features/cabins/CabinTable";
import { useState } from "react";

import AddCabin from "../features/cabins/AddCabin";
import Filter from "../ui/Filter";


function Cabins() {
  

  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
        <div>
          <Filter />
        <p>Filter / Sort</p>  
      </div>
    </Row>

    <Row>
      <CabinTable  />
      <AddCabin />
    </Row>
    </>
  );
}

export default Cabins;
