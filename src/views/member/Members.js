import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthUser } from 'src/services/AuthUser';
import './styles/Member.css';
import { sendToastError } from 'src/config/configToast';
import SearchInput from 'src/components/SearchInput';
import PageSizeDropdown from '../components/PageSizeDropdown';
import Pagination from '../components/Pagination';
import { filteredValue } from 'src/config/common';

const Members = () => {
  const { http } = AuthUser();
  const [members, setMembers] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage, setMembersPerPage] = useState(5);
  const [inputKey, setInputKey] = useState('');
  const navigate = useNavigate();

  const fetchApiMembers = async () => {
    try {
      const response = await http.get('/v1/users');
      return response.data.content;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 500 && error.response.data.message === "Access Denied") {
        sendToastError('Failed to fetch role. Server error occurred.');
        navigate('/403');
        setFetchError(true);
      } else {
        sendToastError('Failed to fetch role.');
      }
      return [];
    }
  };

  const deleteMember = async (memberId) => {
    try {
      await http.delete(`/v1/users/${memberId}`);
      const apiMember = await fetchApiMembers();
      setMembers(apiMember);
      sendToast('Delete member successfully.');
    } catch (error) {
      sendToastError('Failed to update job.');
      navigate('/404');
      console.error('Error deleting member:', error);
    }
  };

  useEffect(() => {
    fetchApiMembers()
      .then(apiMembers => {
        setMembers(apiMembers);
      })
      .catch(err => {
        console.error(err)
        setFetchError(true);
      });
  }, []);

  useEffect(() => {
    fetchApiMembers()
      .then(apiMembers => {
        setMembers(apiMembers);
        setCurrentPage(1);
      })
      .catch(err => {
        console.error(err)
        setFetchError(true);
      });
  }, [membersPerPage, inputKey]);

  const totalMembers = members.length;
  const totalPages = Math.ceil(totalMembers / membersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * membersPerPage;
  const endIndex = startIndex + membersPerPage;
  const filteredMember = filteredValue(members, inputKey);
  const displayedMembers = filteredMember.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h2>Danh sách thành viên</h2>
      <Link to={'/members/add'}>
        <button type="button" className="btn btn-warning mb-3">Thêm</button>
      </Link>
      <SearchInput placeholder="Tìm kiếm..." value={inputKey} onChange={(e) => setInputKey(e.target.value)} />
      <PageSizeDropdown options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} onChange={setMembersPerPage} />
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
            {displayedMembers.map((member, index) => (
              <tr key={`member${index}`}>
                <td>{startIndex + index + 1}</td>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Members;
