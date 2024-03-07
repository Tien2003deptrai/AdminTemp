import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthUser } from 'src/services/AuthUser';
import Page404 from '../pages/page404/Page404';
import { roleCheck } from 'src/config/common';
import './styles/Member.css';

const Members = () => {

  const { role, http } = AuthUser();
  const [members, setMembers] = useState([]);

  const fetchApiMembers = async () => {
    try {
      const response = await http.get('/v1/users');
      return response.data.content;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const deleteMember = async (memberId) => {
    try {
      await http.delete(`/v1/users/${memberId}`);
      const updatedMembers = await fetchApiMembers();
      setMembers(updatedMembers);
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  useEffect(() => {
    fetchApiMembers()
      .then(apiMembers => {
        setMembers(apiMembers);
      })
      .catch(err => console.error(err));
  }, []);

  if (role === roleCheck.staff) {
    return <Page404 />;
  }

  return (
    <div className="container">
      <h2>Danh sách thành viên</h2>
      <Link to={'/members/add'}>
        <button type="button" className="btn btn-warning mb-3">Thêm</button>
      </Link>
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">UserName</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={`member${index}`}>
                <td>{index + 1}</td>
                <td>{member.username}</td>
                <td>{member.email}</td>
                <td>{member.phoneNum}</td>
                <td>{member.roles[0].name}</td>
                <td>
                  <div className="d-flex justify-content-center align-items-center">
                    <Link to={`/members/update/${member.id}`} className="btn btn-primary mx-1">Sửa</Link>
                    <button onClick={() => deleteMember(member.id)} className="btn btn-danger mx-1">Xoá</button>
                    <Link to={`/members/screen/${member.id}`} className="btn btn-success mx-1">Xem</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
