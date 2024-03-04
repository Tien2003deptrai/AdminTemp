import React from 'react';
import { CCard, CCardBody } from '@coreui/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthUser } from 'src/services/AuthUser';
import axios from 'axios'; // Import axios for HTTP requests

const Members = () => {
  const [members, setMembers] = useState([]);
  const { http } = AuthUser();

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

  return (
    <>
      <div className="container">
        <h2>Danh sách thành viên</h2>
        <Link to={'/members/add'}>
          <button type="button" className="btn btn-warning mb-3">Thêm</button>
        </Link>
      </div>
      <CCard className="mb-4">
        <CCardBody>
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">UserName</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Role</th>
                  <th scope="col" className='col-3'>#</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, memberIndex) => (
                  <tr key={`member${memberIndex}`}>
                    <th scope="row">{memberIndex + 1}</th>
                    <td>{member.username}</td>
                    <td>{member.email}</td>
                    <td>{member.phoneNum}</td>
                    <td>{member.roles[0].name}</td>
                    <td>
                      <div className="d-grid gap-2 d-md-block">
                        <Link to={`/members/update/${member.id}`}>
                          <button type="button" className="btn btn-primary mb-2">Sửa</button>
                        </Link>
                        <button type="button" className="btn btn-danger mb-2 ms-2" onClick={() => deleteMember(member.id)}>Xoá</button>
                        <button type="button" className="btn btn-success mb-2 ms-2">Xem</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Members;
