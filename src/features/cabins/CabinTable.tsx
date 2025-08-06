import { useCabins } from './hooks/useCabins';

import type { ICabin } from './types/cabin.type';

import Table from '@/components/ui/Table';
import CabinRow from './CabinRow';
import Menus from '@/components/ui/Menus';
import Spinner from '@/components/ui/Spinner';

function CabinTable() {
  const { cabins, isPending, isError, error } = useCabins();

  if (isPending) return <Spinner />;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
          <div></div>
        </Table.Header>
        {/* <Table.Body>
        {cabins?.map((cabin) => (
          <CabinRow key={cabin.id} cabin={cabin} />
        ))}
      </Table.Body> */}
        <Table.Body<ICabin>
          data={cabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}
export default CabinTable;
