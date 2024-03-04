import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { sendToast, sendToastError } from 'src/config/configToast';
import { AuthUser } from 'src/services/AuthUser';

const UpdateMember = () => {
    const { http } = AuthUser();
    const { id } = useParams();

    const [member, setMember] = useState({
        username: '',
        email: '',
        phoneNum: '',
        role: ''
    });
    const [roles, setRoles] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMember({
            ...member,
            [name]: value
        });
    };

    const fetchMember = async () => {
        try {
            const response = await http.get(`/v1/users/${id}`);
            setMember(response.data);
        } catch (error) {
            console.error(error);
            sendToastError('Failed to fetch member.');
        }
    };

    const fetchApiRole = async () => {
        try {
            const response = await http.get('/v1/roles');
            setRoles(response.data);
        } catch (error) {
            console.error(error);
            sendToastError('Failed to fetch roles.');
        }
    }

    useEffect(() => {
        fetchMember();
        fetchApiRole();
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('member', member);
        if (member.name !== '' && member.email !== '' && member.phone !== '' && member.role !== '') {
            try {
                await http.put(`/v1/users/${id}`, member);
                sendToast('Successfully updated member.');
            } catch (error) {
                console.error('Error updating member:', error.message);
                sendToastError('Failed to update member.');
            }
        } else {
            sendToastError('Please input member.');
        }
    };

    return (
        <div className="container">
            <h2>Cập nhật thành viên</h2>
            <Link to="/members">
                <button type="button" className="btn btn-secondary mb-3">Back to members</button>
            </Link>
            <div className='ms-5'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="fullName" name="name" placeholder="Enter full name"
                            value={member.username}
                            onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter email"
                            value={member.email}
                            onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNo" className="form-label">Phone No</label>
                        <input type="text" className="form-control" id="phoneNo" name="phone" placeholder="Enter phone number"
                            value={member.phoneNum}
                            onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="country" className="form-label">Select Role</label>
                        <select className="form-select" id="country" name="role"
                            value={member.role}
                            onChange={handleInputChange}>
                            <option value="">Select Role</option>
                            {
                                roles.map((role, roleIndex) => (
                                    <option key={`${role}_${roleIndex}`} value={role.name}>{role.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='mb-3'>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateMember;
