import React, { useState, useEffect } from 'react';
import { CCard, CCardBody } from '@coreui/react';
import { Link } from 'react-router-dom';
import { AuthUser } from 'src/services/AuthUser';
import { sendToast, sendToastError } from 'src/config/configToast';
import { handleAdd, handleDelete, handleUpdate, usePermissionState } from 'src/config/permissions';
import { roleCheck } from 'src/config/common';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const { http, token, role } = AuthUser();

  const {
    haveAdd, setHaveAdd,
    haveUpdate, setHaveUpdate,
    haveDelete, setHaveDelete,
    haveView, setHaveView
  } = usePermissionState();

  const fetchApiProjects = async () => {
    try {
      const response = await http.get('/v1/projects');
      return response.data.content;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    fetchApiProjects()
      .then(apiProjects => {
        setProjects(apiProjects);
      })
      .catch(err => console.error(err));
  }, []);

  const deleteProject = async (projectId) => {
    try {
      await http.delete(`/v1/projects/${projectId}`);
      const updatedProjects = projects.filter(project => project.id !== projectId);
      setProjects(updatedProjects);
      sendToast('Project deleted successfully.');
    } catch (error) {
      console.error(error);
      sendToastError('Failed to delete project.');
    }
  };

  useEffect(() => {

    if (role === roleCheck.staff) {
      setHaveAdd(false);
      setHaveUpdate(false);
      setHaveDelete(false);
      setHaveView(true);
    } if (token && role === roleCheck.manager || role === roleCheck.admin) {
      setHaveAdd(true);
      setHaveUpdate(true);
      setHaveDelete(true);
      setHaveView(true);
    }
  }, [token, role])

  const permissionAdd = () => {
    handleAdd(haveAdd)
  }

  const permissionUpdate = () => {
    handleUpdate(haveUpdate)
  }

  const permissionDelete = () => {
    handleDelete(haveDelete)
  }

  const checkPermissionAccessAdd = () => {
    return (
      <>
        {
          token && role === roleCheck.staff ? (
            <button type="button" className="btn btn-warning mb-3"
              onClick={() => permissionAdd()}
            >
              Thêm mới
            </button>
          ) : (
            <Link to={'/projects/add'}>
              <button type="button" className="btn btn-warning mb-3">Thêm mới</button>
            </Link>
          )
        }
      </>
    )
  }

  return (
    <>
      <div className="container">
        <h2>Danh sách dự án</h2>
        {
          checkPermissionAccessAdd()
        }
      </div>
      <CCard className="mb-4">
        <CCardBody>
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Tên dự án</th>
                  <th scope="col">Ngày bắt đầu</th>
                  <th scope="col">Ngày kết thúc</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, projectIndex) => (
                  <tr key={`project${projectIndex}`}>
                    <td>{projectIndex + 1}</td>
                    <td>{project.name}</td>
                    <td>{project.startDate}</td>
                    <td>{project.endDate}</td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        {
                          token && role === roleCheck.staff ? (
                            <button type="button" className="btn btn-primary mx-1"
                              onClick={() => permissionUpdate()}
                            >
                              Sửa
                            </button>
                          ) : (
                            <Link to={`/projects/update/${project.id}`} className="btn btn-primary mx-1">
                              Sửa
                            </Link>
                          )
                        }
                        {
                          token && role === roleCheck.staff ? (
                            <button type="button" className="btn btn-danger mx-1"
                              onClick={() => permissionDelete()}
                            >
                              Xoá
                            </button>
                          ) : (
                            <button onClick={() => deleteProject(project.id)} className="btn btn-danger mx-1">Xoá</button>
                          )
                        }
                        <Link to={`/projects/screen/${project.id}`} className="btn btn-success mx-1">Xem</Link>
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

export default Project;
