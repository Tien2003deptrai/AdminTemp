import React from 'react';
import { CFormInput } from '@coreui/react';

const SearchInput = ({ placeholder, onChange, value }) => {
    return (
        <CFormInput
            type="text"
            placeholder={placeholder}
            className="me-2"
            style={{ width: '300px' }}
            value={value}
            onChange={onChange}
        />
    );
};

export default SearchInput;
