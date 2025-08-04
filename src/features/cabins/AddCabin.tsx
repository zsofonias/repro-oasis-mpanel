import CabinForm from './CabinForm';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModel, setIsOpenModel] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModel((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModel && (
//         <Modal onClose={() => setIsOpenModel(false)}>
//           <CabinForm onCancel={() => setIsOpenModel(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
