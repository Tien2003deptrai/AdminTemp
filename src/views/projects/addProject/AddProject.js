import React, { useState } from 'react';
import { CCard, CCardBody, CForm, CFormInput, CInputGroup, CInputGroupText, CButton } from '@coreui/react';
import { AuthUser } from 'src/services/AuthUser';
import { sendToast, sendToastError } from 'src/config/configToast';
import { Link, useNavigate } from 'react-router-dom';

const AddProject = () => {
    const { http } = AuthUser();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        endDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await http.post('/v1/projects', formData);
            navigate('/projects');
            sendToast('Project added successfully.');
        } catch (error) {
            sendToastError('Failed to add project.');
            navigate('/404');
            console.error(error);
        }
    };

    return (
        <CCard>
            <CCardBody>
                <h4 className="card-title mb-4">Add Project</h4>
                <Link to="/projects">
                    <button type="button" className="btn btn-secondary mb-3">Back to Projects</button>
                </Link>
                <CForm onSubmit={handleSubmit}>
                    <CInputGroup className="mb-3">
                        <CInputGroupText>Project Name</CInputGroupText>
                        <CFormInput
                            type="text"
                            placeholder="Enter project name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                        <CInputGroupText>Start Date</CInputGroupText>
                        <CFormInput
                            type="text"
                            placeholder="Enter start date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                        />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                        <CInputGroupText>End Date</CInputGroupText>
                        <CFormInput
                            type="text"
                            placeholder="Enter end date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                        />
                    </CInputGroup>
                    <CButton type="submit" color="primary">Add Project</CButton>
                </CForm>
            </CCardBody>
        </CCard>
    );
};

export default AddProject;
