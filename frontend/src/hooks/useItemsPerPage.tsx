import { useState, useEffect } from 'react';

const UseItemsPerPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(20);  // Default value for small screens

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1536) {
        setItemsPerPage(32);  // 2xl size (min 1536px)
      } 
      else if (width >= 1280) {
        setItemsPerPage(30);  // xl size (min 1280px)
      } 
      else if (width >= 1024) {
        setItemsPerPage(25);  // lg size (min 1024px)
      } 
      else if (width >= 768) {
        setItemsPerPage(15);  // md size (min 768px)
      } 
      else {
        setItemsPerPage(10);  // sm size (min 640px)
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return itemsPerPage;
};

export default UseItemsPerPage;
