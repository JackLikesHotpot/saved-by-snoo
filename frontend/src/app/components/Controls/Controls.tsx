import styles from './Controls.module.css'

interface Controls {
  currentPage: number,
  setCurrentPage: (page: number) => void,
  itemsPerPage: number,
  numberOfImages: number
}

const Output: React.FC<Controls> = ({itemsPerPage, currentPage, setCurrentPage, numberOfImages}) => {

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  };
  
  const totalPages = Math.ceil(numberOfImages / itemsPerPage)

  return (
    <div className={styles['controls']}>
    <button
      onClick={handlePrevPage}
      disabled={currentPage === 1}
      className={styles['page-button']}
    >
      Previous
    </button>
    <span>Page {currentPage} of {totalPages}</span>
    <button
      onClick={handleNextPage}
      disabled={currentPage === totalPages}
      className={styles['page-button']}
    >
      Next
    </button>
  </div>
  )
}

export default Output;