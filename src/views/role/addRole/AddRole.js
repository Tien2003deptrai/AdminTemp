import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CButton, CCard, CCardBody, CForm, CFormInput } from '@coreui/react';
import { AuthUser } from 'src/services/AuthUser';
import { sendToast, sendToastError } from 'src/config/configToast';

const AddRole = () => {
    const { http } = AuthUser();
    const [roleName, setRoleName] = useState('');
    const [roleDescription, setRoleDescription] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setRoleName(e.target.value);
    };

    const handleChangeDescription = (e) => {
        setRoleDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await http.post('/v1/roles', { name: roleName, description: roleDescription });
            sendToast('Role added successfully.');
            setRoleName('');
            setRoleDescription('')
            navigate('/roles');
        } catch (error) {
            sendToastError('Failed to add role.');
            navigate('/404');
            console.error(error);
        }
    };

    return (
        <>
            <div className="container">
                <h2>Add New Role</h2>
                <Link to="/roles">
                    <button type="button" className="btn btn-secondary mb-3">Back to Roles</button>
                </Link>
            </div>
            <CCard className="mb-4">
                <CCardBody>
                    <CForm onSubmit={handleSubmit}>
                        <CFormInput
                            type="text"
                            placeholder="Role Name"
                            value={roleName}
                            onChange={handleChange}
                            required
                            className='mb-3'
                        />
                        <CFormInput
                            type="text"
                            placeholder="Description"
                            value={roleDescription}
                            onChange={handleChangeDescription}
                            required
                        />
                        <CButton color="primary" type="submit" className="mt-3">
                            Add Role
                        </CButton>
                    </CForm>
                </CCardBody>
            </CCard>
        </>
    );
};

export default AddRole;
