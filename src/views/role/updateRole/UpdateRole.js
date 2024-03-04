import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CButton, CCard, CCardBody, CForm, CFormInput } from '@coreui/react';
import { AuthUser } from 'src/services/AuthUser';
import { sendToast, sendToastError } from 'src/config/configToast';

const UpdateRole = () => {
    const { id } = useParams();
    const { http } = AuthUser();
    const [roleName, setRoleName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const response = await http.put(`/v1/roles/${id}`);
                setRoleName(response.data.name);
                setLoading(false);
            } catch (error) {
                sendToastError('Failed to fetch role details.');
                console.error(error);
            }
        };
        fetchRole();
    }, [id, http]);

    const handleChange = (e) => {
        setRoleName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await http.put(`/v1/roles/${id}`, { name: roleName });
            sendToast('Role updated successfully.');
        } catch (error) {
            sendToastError('Failed to update role.');
            console.error(error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="container">
                <h2>Update Role</h2>
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
                        />
                        <CButton color="primary" type="submit" className="mt-3">
                            Update Role
                        </CButton>
                    </CForm>
                </CCardBody>
            </CCard>
        </>
    );
};

export default UpdateRole;
