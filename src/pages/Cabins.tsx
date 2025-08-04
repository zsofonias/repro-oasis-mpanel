import Heading from '@/components/ui/Heading';
import Row from '@/components/ui/Row';
import CabinTable from '@/features/cabins/CabinTable';
import AddCabin from '@/features/cabins/AddCabin';

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row type="vertical">
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
