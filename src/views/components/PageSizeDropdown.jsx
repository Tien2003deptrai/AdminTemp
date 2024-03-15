import React from 'react';

const PageSizeDropdown = ({ options, onChange }) => {
    const handleChange = (e) => {
        onChange(parseInt(e.target.value, 10));
    };

    return (
        <select className="m-2" onChange={handleChange}>
            {options.map(option => (
                <option key={option} value={option}>
                    {`Hiển thị mục ${option}`}
                </option>
            ))}
        </select>
    );
};

export default PageSizeDropdown;