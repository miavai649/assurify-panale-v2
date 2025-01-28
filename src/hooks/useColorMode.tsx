import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light');

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    colorMode === 'dark'
      ? bodyClass.add(className)
      : bodyClass.remove(className);

    const tableContainer = window.document.querySelector(
      '.ant-table',
    ) as HTMLElement;

    const tableHeader = window.document.querySelector(
      '.ant-table-thead',
    ) as HTMLElement;
    if (tableContainer) {
      tableContainer.style.backgroundColor =
        colorMode === 'dark' ? '#24303F' : '#fff';
    }

    if (tableHeader) {
      tableHeader.style.backgroundColor =
        colorMode === 'dark' ? '#24303F' : '#fff';
    }
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
