import React from 'react'
import { Button } from 'react-bootstrap';
type PaginationProps = {
    currentPage: number;
    totalPages: number;
    handleNextPage: (page: number) => void;
    handlePrevPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, handleNextPage, handlePrevPage, totalPages }: PaginationProps) => {
    const addOneOffSetCurrentPage = (currentPage: number) => currentPage + 1;

    return (
        <div className="pagination-button-wrapper" >
            <Button
                className="btn-dark"
                onClick={() => handlePrevPage(addOneOffSetCurrentPage(currentPage))}
                disabled={currentPage === 0}
            > Previus
            </Button>

            <span className=" p-4 h6" >
                Page {addOneOffSetCurrentPage(currentPage)} of {totalPages}
            </span>

            <Button
                className="btn-dark"
                onClick={() => handleNextPage(addOneOffSetCurrentPage(currentPage))}
                disabled={addOneOffSetCurrentPage(currentPage) === totalPages}
            > Next</Button>
        </div>
    )
}

export default Pagination