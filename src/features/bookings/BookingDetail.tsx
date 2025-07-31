import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '@/components/ui/Row';
import Heading from '@/components/ui/Heading';
import Tag from '@/components/ui/Tag';
import ButtonGroup from '@/components/ui/ButtonGroup';
import Button from '@/components/ui/Button';
import ButtonText from '@/components/ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const booking = {};
  const status = 'checked-in';

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #X</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
