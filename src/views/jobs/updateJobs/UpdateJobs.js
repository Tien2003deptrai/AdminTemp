import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CCard, CCardBody, CForm, CInputGroup, CFormInput, CButton } from '@coreui/react';
import { AuthUser } from 'src/services/AuthUser';
import { sendToast, sendToastError } from 'src/config/configToast';

const UpdateJobs = () => {
    const { id } = useParams();
    const { http } = AuthUser();
    const navigate = useNavigate();

    const [job, setJob] = useState({
        name: '',
        startDate: '',
        endDate: '',
        status: ''
    });

    useEffect(() => {
        fetchJob();
    }, []);

    const fetchJob = async () => {
        try {
            const response = await http.get(`/v1/tasks/${id}`);
            setJob(response.data);
        } catch (error) {
            console.error(error);
            sendToastError('Failed to fetch job details.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await http.put(`/v1/tasks/${id}`, job);
            navigate('/jobs')
            sendToast('Job updated successfully.');
        } catch (error) {
            console.error(error);
            sendToastError('Failed to update job.');
            navigate('/404');
        }
    };

    return (
        <CCard>
            <CCardBody>
                <h3>Update Job</h3>
                <Link to="/jobs">
                    <button type="button" className="btn btn-secondary mb-3">Back to Jobs</button>
                </Link>
                <CForm onSubmit={handleSubmit}>
                    <CInputGroup className='mb-3'>
                        <CFormInput
                            type="text"
                            placeholder="Job Name"
                            name="name"
                            value={job.name}
                            onChange={handleChange}
                        />
                    </CInputGroup>
                    <CInputGroup className='mb-3'>
                        <CFormInput
                            type="date"
                            placeholder="Start Date"
                            name="startDate"
                            value={job.startDate}
                            onChange={handleChange}
                        />
                    </CInputGroup>
                    <CInputGroup className='mb-3'>
                        <CFormInput
                            type="date"
                            placeholder="End Date"
                            name="endDate"
                            value={job.endDate}
                            onChange={handleChange}
                        />
                    </CInputGroup>
                    <CInputGroup className='mb-3'>
                        <CFormInput
                            type="text"
                            placeholder="Status"
                            name="status"
                            value={job.status}
                            onChange={handleChange}
                        />
                    </CInputGroup>
                    <CButton type="submit" color="primary">Update</CButton>
                </CForm>
            </CCardBody>
        </CCard>
    );
};

export default UpdateJobs;
