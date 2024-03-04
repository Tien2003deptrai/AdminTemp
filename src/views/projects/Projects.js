import React from 'react'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { AuthUser } from 'src/services/AuthUser';
import { sendToast, sendToastError } from 'src/config/configToast';

const Project = () => {

  const [projects, setProjects] = useState([]);
  const { http } = AuthUser();

  const fetchApiProjects = async () => {
    return await http.get('/v1/projects')
      .then(res => { return res.data.content })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchApiProjects()
      .then(apiProject => {
        setProjects(apiProject)
        console.log(projects);
      })
      .catch(err => console.error(err))
  }, [])

  const deleteProject = async (projectId) => {
    try {
      await http.delete(`/v1/projects/${projectId}`);
      sendToast('Project deleted successfully.');
      fetchApiProjects();
    } catch (error) {
      console.error(error);
      sendToastError('Failed to delete project.');
    }
  };

  return (
    <>
      <div className="container">
        <h2>Danh sách dự án</h2>
        <Link to={'/projects/add'}>
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
                  <th scope="col">Tên dự án</th>
                  <th scope="col">Ngày bắt đầu</th>
                  <th scope="col">Ngày kết thúc</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {
                  projects?.length > 0 &&
                  projects.map((project, projectIndex) => (
                    <tr key={`project${projectIndex}`}>
                      <th scope="row">{projectIndex + 1}</th>
                      <td>{project.name}</td>
                      <td>{project.startDate}</td>
                      <td>{project.endDate}</td>
                      <td>
                        <div className="d-grid gap-2 d-md-block">
                          <Link to={`/projects/update/${project.id}`}>
                            <button type="button" className="btn btn-primary mb-2">Sửa</button>
                          </Link>
                          <button type="button" className="btn btn-danger mb-2 ms-2" onClick={() => deleteProject(project.id)}>Xoá</button>
                          <button type="button" className="btn btn-success mb-2 ms-2">Xem</button>
                        </div>
                      </td>
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

export default Project
