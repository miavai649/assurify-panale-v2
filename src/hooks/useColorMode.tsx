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

    // const updateModalBackground = () => {
    //   setTimeout(() => {
    //     document.querySelectorAll('.ant-modal-content').forEach((modal) => {
    //       (modal as HTMLElement).style.backgroundColor =
    //         colorMode === 'dark' ? '#1C2434' : '#fff';
    //     });

    //     document.querySelectorAll('.ant-modal-header').forEach((header) => {
    //       (header as HTMLElement).style.backgroundColor =
    //         colorMode === 'dark' ? '#1C2434' : '#fff';
    //     });
    //     document.querySelectorAll('.ant-modal-title').forEach((title) => {
    //       (title as HTMLElement).style.color =
    //         colorMode === 'dark' ? '#fff' : '#1C2434';
    //     });
    //   }, 0);
    // };

    // updateModalBackground();

    // const observer = new MutationObserver(updateModalBackground);
    // observer.observe(document.body, { childList: true, subtree: true });

    // return () => observer.disconnect();
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
