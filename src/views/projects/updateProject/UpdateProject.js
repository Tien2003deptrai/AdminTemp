import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CCard, CCardBody, CForm, CInputGroup, CFormInput, CButton } from '@coreui/react';
import { AuthUser } from 'src/services/AuthUser';
import { sendToast, sendToastError } from 'src/config/configToast';

const UpdateProject = () => {
    const { id } = useParams();
    const { http } = AuthUser();

    const [project, setProject] = useState({
        name: '',
        startDate: '',
        endDate: ''
    });

    const fetchProject = async () => {
        try {
            const response = await http.get(`/v1/projects/${id}`);
            setProject(response.data);
        } catch (error) {
            console.error(error);
            sendToastError('Failed to fetch project details.');
        }
    };

    useEffect(() => {
        fetchProject();
    }, []);

    const handleUpdateProject = async (e) => {
        e.preventDefault();
        try {
            await http.put(`/v1/projects/${id}`, project);
            sendToast('Project updated successfully.');
        } catch (error) {
            console.error(error);
            sendToastError('Failed to update project.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <CCard>
            <CCardBody>
                <h3>Update Project</h3>
                <Link to="/projects">
                    <button type="button" className="btn btn-secondary mb-3">Back to Projects</button>
                </Link>
                <CForm onSubmit={handleUpdateProject}>
                    <CInputGroup className='mb-3'>
                        <CFormInput
                            type="text"
                            placeholder="Project Name"
                            name="name"
                            value={project.name}
                            onChange={handleChange}
                        />
                    </CInputGroup>
                    <CInputGroup className='mb-3'>
                        <CFormInput
                            type="date"
                            placeholder="Start Date"
                            name="startDate"
                            value={project.startDate}
                            onChange={handleChange}
                        />
                    </CInputGroup>
                    <CInputGroup className='mb-3'>
                        <CFormInput
                            type="date"
                            placeholder="End Date"
                            name="endDate"
                            value={project.endDate}
                            onChange={handleChange}
                        />
                    </CInputGroup>
                    <CButton type="submit" color="primary">Update</CButton>
                </CForm>
            </CCardBody>
        </CCard>
    );
};

export default UpdateProject;
