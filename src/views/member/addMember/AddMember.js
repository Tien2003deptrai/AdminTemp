import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sendToast, sendToastError } from 'src/config/configToast';
import { AuthUser } from 'src/services/AuthUser';

const AddMember = () => {
    const { http } = AuthUser();

    const [roles, setRoles] = useState([]);
    const [members, setMembers] = useState({
        name: '',
        email: '',
        phone: '',
        role: roles
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMembers({
            ...members,
            [name]: value
        });
    };

    const addMemberApi = async (memberData) => {
        console.log('role', memberData.role);
        try {
            const response = await http.post(`/v1/users/role/${memberData.role}`, memberData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

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
        fetchApiRole();
    }, []);

    useEffect(() => {
        setMembers(prevState => ({
            ...prevState,
            role: roles.length > 0 ? roles[0].id : ''
        }));
    }, [roles]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (members.name.trim() !== '' && members.email.trim() !== '' && members.phone.trim() !== '' && members.role !== '') {
            try {
                await addMemberApi(members);
                sendToast('Successfully added to users list.')
                setMembers({
                    name: '',
                    email: '',
                    phone: '',
                    role: ''
                });
            } catch (error) {
                console.error('Error adding member:', error.message);
                sendToastError('Failed to add member.');
            }
        }
        else {
            sendToastError('Please input member.');
        }
        console.log('member', members);
    };

    return (
        <div className="container">
            <h2>Thêm mới thành viên</h2>
            <Link to="/members">
                <button type="button" className="btn btn-secondary mb-3">Back to member</button>
            </Link>
            <div className='ms-5'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="fullName" name="name" placeholder="Nhập họ và tên"
                            value={members.name}
                            onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Nhập email"
                            value={members.email}
                            onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNo" className="form-label">Phone No</label>
                        <input type="text" className="form-control" id="phoneNo" name="phone" placeholder="Nhập số điện thoại"
                            value={members.phone}
                            onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="roles" className="form-label">Select Role</label>
                        <select className="form-select" id="roles" name="role"
                            value={members.role}
                            onChange={handleInputChange}>
                            <option value="">Chọn Role</option>
                            {
                                roles.map((role, roleIndex) => (
                                    <option key={`${role}_${roleIndex}`} value={role.id}>{role.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='mb-3'>
                        <button type="submit" className="btn btn-primary">Lưu lại</button>
                        <button type="reset" className="btn btn-secondary ms-2">Quay lại</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMember;
