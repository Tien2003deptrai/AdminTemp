import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthUser } from 'src/services/AuthUser';
import { sendToastError, sendToast } from 'src/config/configToast';
import SearchInput from 'src/components/SearchInput';
import Pagination from '../components/Pagination';
import { filteredValue } from 'src/config/common';
import PageSizeDropdown from '../components/PageSizeDropdown';

const Project = () => {
  const { http } = AuthUser();
  const [projects, setProjects] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(5);
  const [inputKey, setInputKey] = useState('');
  const navigate = useNavigate();

  const fetchApiProjects = async () => {
    try {
      const response = await http.get('/v1/projects');
      return response.data.content;
    } catch (error) {
      console.error(error);
      sendToastError('Failed to fetch projects. Server error occurred.');
      navigate('/403');
      setFetchError(true);
      return [];
    }
  };

  useEffect(() => {
    fetchApiProjects()
      .then(apiProjects => {
        setProjects(apiProjects);
      })
      .catch(err => {
        console.error(err);
        setFetchError(true);
      });
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
      navigate('/404');
    }
  };

  const totalProjects = projects.length;
  const totalPages = Math.ceil(totalProjects / projectsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const filteredProjects = filteredValue(projects, inputKey);
  const displayedProjects = filteredProjects.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h2>Danh sách dự án</h2>
      <Link to={'/projects/add'}>
        <button type="button" className="btn btn-warning mb-3">Thêm mới</button>
      </Link>
      <SearchInput placeholder="Tìm kiếm..." value={inputKey} onChange={(e) => setInputKey(e.target.value)} />
      <PageSizeDropdown options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} onChange={setProjectsPerPage} />
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
            {displayedProjects.map((project, index) => (
              <tr key={`project${index}`}>
                <td>{startIndex + index + 1}</td>
                <td>{project.name}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>
                  <div className="d-flex justify-content-center align-items-center">
                    <Link to={`/projects/update/${project.id}`} className="btn btn-primary mx-1">Sửa</Link>
                    <button onClick={() => deleteProject(project.id)} className="btn btn-danger mx-1">Xoá</button>
                    <Link to={`/projects/screen/${project.id}`} className="btn btn-success mx-1">Xem</Link>
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

export default Project;
