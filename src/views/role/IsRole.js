import React, { useEffect, useState } from 'react';
import { CCard, CCardBody } from '@coreui/react';
import { Link } from 'react-router-dom';
import { AuthUser } from 'src/services/AuthUser';
import { sendToast, sendToastError } from 'src/config/configToast';
import { roleCheck } from 'src/config/common';
import Page404 from '../pages/page404/Page404';

const IsRole = () => {
  const [roles, setRoles] = useState([]);
  const { role, http } = AuthUser();

  const fetchApiRoles = async () => {
    try {
      const response = await http.get('/v1/roles');
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  const deleteRole = async (id) => {
    try {
      await http.delete(`/v1/roles/${id}`);
      const updatedRoles = roles.filter(role => role.id !== id);
      setRoles(updatedRoles);
      sendToast('Role deleted successfully.');
    } catch (error) {
      sendToastError('Failed to delete role.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApiRoles()
      .then(apiRoles => {
        setRoles(apiRoles)
      })
      .catch(err => console.error(err))
  }, [])

  if (role === roleCheck.staff || role === roleCheck.manager) {
    return <Page404 />;
  }

  return (
    <>
      <div className="container">
        <h2>Danh sách quyền</h2>
        <Link to={'/roles/add'}>
          <button type="button" className="btn btn-warning mb-3">Thêm mới</button>
        </Link>
      </div>
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
                {roles.map((role, roleIndex) => (
                  <tr key={roleIndex}>
                    <td>{roleIndex + 1}</td>
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
    </>
  );
}

export default IsRole;
