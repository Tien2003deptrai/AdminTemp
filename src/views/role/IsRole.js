import React, { useEffect, useState } from 'react';
import { CCard, CCardBody } from '@coreui/react';
import { Link } from 'react-router-dom';
import { AuthUser } from 'src/services/AuthUser';
import { sendToast, sendToastError } from 'src/config/configToast';

const IsRole = () => {
  const [roles, setRoles] = useState([]);
  const { http } = AuthUser();

  const fetchApiRoles = async () => {
    return http.get('/v1/roles')
      .then(res => { return res.data })
      .catch(err => console.error(err))
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
        console.log(roles);
      })
      .catch(err => console.error(err))
  }, [])

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
                  <th scope="col" className="col-3">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {
                  roles?.length > 0 &&
                  roles.map((role, roleIndex) => (
                    <tr key={roleIndex}>
                      <td scope="col">{roleIndex + 1}</td>
                      <td scope="col">{role.name}</td>
                      <td scope="col">{role.description}</td>
                      <div className="d-grid gap-2 d-md-block">
                        <Link to={`/roles/update/${role.id}`}>
                          <button type="button" className="btn btn-primary mb-2">Sửa</button>
                        </Link>
                        <button type="button" className="btn btn-danger mb-2 ms-2" onClick={() => deleteRole(role.id)}>Xoá</button>
                      </div>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </CCardBody>
      </CCard>
    </>
  );
}

export default IsRole;
