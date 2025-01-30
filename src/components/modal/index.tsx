import { Modal } from 'antd';
import { ReactNode } from 'react';
import CustomButton from '../CustomButton';

interface ICustomModalProps {
  buttonContent: ReactNode;
  modalState: boolean;
  setModalState: (modalState: boolean) => void;
  modalTitle: string;
  modalResponsiveWidth?: object;
  modalContent: ReactNode;
}

const CustomModal = ({
  buttonContent,
  modalState,
  setModalState,
  modalTitle,
  modalResponsiveWidth,
  modalContent,
}: ICustomModalProps) => {
  return (
    <>
      <CustomButton onClick={() => setModalState(true)} variant="primary">
        {buttonContent}
      </CustomButton>
      <Modal
        title={modalTitle}
        centered
        className="bg-black-2"
        open={modalState}
        onCancel={() => setModalState(false)}
        width={modalResponsiveWidth}
        footer={null}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default CustomModal;
