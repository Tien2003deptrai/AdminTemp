import React, { useState } from 'react';
import { CCard, CCardBody, CForm, CInputGroup, CFormInput, CButton } from '@coreui/react';
import { AuthUser } from 'src/services/AuthUser';
import { sendToast, sendToastError } from 'src/config/configToast';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AddJob = () => {
    const { http } = AuthUser();
    const navigate = useNavigate();

    const [job, setJob] = useState({
        name: '',
        startDate: '',
        endDate: '',
        status: '',
    });
    const [users, setUsers] = useState([]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const fetchApiMembers = async () => {
        return await http.get('/v1/users')
            .then(res => { return res.data.content })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchApiMembers()
            .then(apiUser => {
                setUsers(apiUser)
                console.log(users);
            })
            .catch(err => console.error(err))
    }, [])

    // lấy userId để đưa vào api /v1/projects/:projectId/users/:userId/tasks


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await http.post(`/v1/projects/:projectId/users/:userId/tasks`, job);
            navigate('/jobs')
            sendToast('Job added successfully.');
        } catch (error) {
            console.error(error);
            sendToastError('Failed to add job.');
        }
    };

    return (
        <CCard>
            <CCardBody>
                <h3>Add Job</h3>
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
                    <CButton type="submit" color="primary">Add</CButton>
                </CForm>
            </CCardBody>
        </CCard>
    );
};

export default AddJob;
