import React, { useEffect, useState } from 'react';
import { CCard, CCardBody } from '@coreui/react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthUser } from 'src/services/AuthUser';
import { sendToast, sendToastError } from 'src/config/configToast';
import SearchInput from 'src/components/SearchInput';
import PageSizeDropdown from '../components/PageSizeDropdown';
import Pagination from '../components/Pagination';
import { filteredValue } from 'src/config/common';

const IsRole = () => {
  const { http } = AuthUser();
  const [roles, setRoles] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage, setRolesPerPage] = useState(5);
  const [inputKey, setInputKey] = useState('');
  const navigate = useNavigate();

  const fetchApiRoles = async () => {
    try {
      const response = await http.get('/v1/roles');
      return response.data;
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 500 && error.response.data.message === "Access Denied") {
        sendToastError('Failed to fetch role. Server error occurred.');
        navigate('/403');
        setFetchError(true);
      } else {
        sendToastError('Failed to fetch role.');
      }
      return [];
    }
  }

  const deleteRole = async (id) => {
    try {
      await http.delete(`/v1/roles/${id}`);
      const updatedRoles = roles.filter(role => role.id !== id);
      setRoles(updatedRoles);
      sendToast('Deleted role successfully.');
    } catch (error) {
      sendToastError('Failed to delete role.');
      navigate('/404');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApiRoles()
      .then(apiRoles => {
        setRoles(apiRoles)
      })
      .catch(err => {
        console.error(err)
        setFetchError(true);
      })
  }, [])

  if (fetchError) {
    return <Page403 />;
  }

  const totalRoles = roles.length;
  const totalPages = Math.ceil(totalRoles / rolesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * rolesPerPage;
  const endIndex = startIndex + rolesPerPage;
  const filteredRoles = filteredValue(roles, inputKey);
  const displayedRoles = filteredRoles.slice(startIndex, endIndex);

  return (
    <>
      <div className="container">
        <h2>Danh sách quyền</h2>
        <Link to={'/roles/add'}>
          <button type="button" className="btn btn-warning mb-3">Thêm mới</button>
        </Link>
      </div>
      <SearchInput placeholder="Tìm kiếm..." value={inputKey} onChange={(e) => setInputKey(e.target.value)} />
      <PageSizeDropdown options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} onChange={setRolesPerPage} />
      <CCard className="mb-4">
        <CCardBody>
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Tên quyền</th>
                  <th scope="col">Miêu tả</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {displayedRoles.map((role, index) => (
                  <tr key={index}>
                    <td>{startIndex + index + 1}</td>
                    <td>{role.name}</td>
                    <td>{role.description}</td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        <Link to={`/roles/update/${role.id}`} className="btn btn-primary mx-1">Sửa</Link>
                        <button onClick={() => deleteRole(role.id)} className="btn btn-danger mx-1">Xoá</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CCardBody>
      </CCard>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default IsRole;
