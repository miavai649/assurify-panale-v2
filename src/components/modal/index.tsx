import { ConfigProvider, Modal } from 'antd';
import { ReactNode } from 'react';
import CustomButton from '../CustomButton';
import { useColorModeContext } from '../../context/ColorModeContext';

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
  const { state } = useColorModeContext();
  const { colorMode } = state;

  const darkMode = colorMode === 'dark';

  return (
    <>
      <CustomButton onClick={() => setModalState(true)} variant="primary">
        {buttonContent}
      </CustomButton>

      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: darkMode ? '#1C2434' : '#fff',
              headerBg: darkMode ? '#1C2434' : '#fff',
              titleColor: darkMode ? '#fff' : '#333',
              colorIcon: darkMode ? '#fff' : '#333',
              borderRadiusLG: 8,
            },
          },
        }}
      >
        <Modal
          title={
            <span style={{ color: darkMode ? '#fff' : '#333' }}>
              {modalTitle}
            </span>
          }
          centered
          open={modalState}
          onCancel={() => setModalState(false)}
          width={modalResponsiveWidth}
          footer={null}
        >
          {modalContent}
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default CustomModal;
