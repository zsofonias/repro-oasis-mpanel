import { useEffect } from 'react';

import { getCabins } from '@/services/apiCabins';

import Heading from '@/components/ui/Heading';
import Row from '@/components/ui/Row';

function Cabins() {
  useEffect(() => {
    getCabins().then((data) => console.log(data));
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Cabins;
