/** @format */

import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
import CabinTable from './CabinTable';

const AddCabin = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

// const AddCabin = () => {
//   const [isModelOpen, setIsModelOpen] = useState(false);
//   return (
//     <>
//       <Button onClick={() => setIsModelOpen(show => !show)}>
//         Add New Cabin
//       </Button>
//       {isModelOpen && (
//         <Modal onClose={() => setIsModelOpen(false)}>
//           <CreateCabinForm onCloseModal={() => setIsModelOpen(false)} />
//         </Modal>
//       )}
//     </>
//   );
// };

export default AddCabin;
