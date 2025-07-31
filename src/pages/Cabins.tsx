import { useState } from 'react';

import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Row from '@/components/ui/Row';
import CabinTable from '@/features/cabins/CabinTable';
import CreateCabinForm from '@/features/cabins/CreateCabinForm';

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row type="vertical">
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          {showForm ? 'Hide form' : 'Show form'}
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
