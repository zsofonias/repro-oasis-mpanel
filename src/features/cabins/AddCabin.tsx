import { useState } from 'react';

import CabinForm from './CabinForm';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

function AddCabin() {
  const [isOpenModel, setIsOpenModel] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpenModel((show) => !show)}>
        Add new cabin
      </Button>
      {isOpenModel && (
        <Modal onClose={() => setIsOpenModel(false)}>
          <CabinForm onCancel={() => setIsOpenModel(false)} />
        </Modal>
      )}
    </div>
  );
}
export default AddCabin;
