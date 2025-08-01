import { useState } from 'react';
import styled from 'styled-components';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

import { useCreateCabin } from './hooks/useCreateCabin';
import { useDeleteCabin } from './hooks/useDeleteCabin';
import { formatCurrency } from '@/utils/helpers';
import type { ICabin } from './types/cabin';

import CreateCabinForm from './CreateCabinForm';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

type Props = {
  cabin: ICabin;
};

function CabinRow({ cabin }: Props) {
  const [showForm, setShowForm] = useState(false);

  const { mutate: createCabin, isPending: isCreating } = useCreateCabin();
  const { mutate: deleteCabin, isPending: isDeleting } = useDeleteCabin();

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${cabin.name}`,
      max_capacity: cabin.maxCapacity,
      regular_price: cabin.regularPrice,
      discount: cabin.discount,
      description: cabin.description,
      image: cabin.image,
    });
  }

  return (
    <>
      <TableRow role="row">
        {cabin.image ? (
          <Img src={cabin.image} alt={cabin.name} />
        ) : (
          <span>&mdash;</span>
        )}
        <Cabin>{cabin.name}</Cabin>
        <div>{cabin.maxCapacity}</div>
        <Price>{formatCurrency(cabin.regularPrice)}</Price>
        {cabin.discount ? (
          <Discount>{cabin.discount}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button onClick={handleDuplicate} disabled={isCreating}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowForm((show) => !show)}>
            <HiPencil />
          </button>
          <button onClick={() => deleteCabin(cabin.id)} disabled={isDeleting}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && (
        <CreateCabinForm cabin={cabin} onCancel={() => setShowForm(false)} />
      )}
    </>
  );
}
export default CabinRow;
