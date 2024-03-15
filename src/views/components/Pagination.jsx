import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                <li className='page-item'>
                    <button className='page-link' onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <button onClick={() => onPageChange(number)} className='page-link'>
                            {number}
                        </button>
                    </li>
                ))}
                <li className='page-item'>
                    <button className='page-link' onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
