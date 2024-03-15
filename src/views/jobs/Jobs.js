import React, { useState, useEffect } from 'react';
import { CCard, CCardBody } from '@coreui/react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthUser } from 'src/services/AuthUser';
import { sendToast, sendToastError } from 'src/config/configToast';
import SearchInput from 'src/components/SearchInput';
import PageSizeDropdown from '../components/PageSizeDropdown';
import Pagination from '../components/Pagination';
import { filteredValue } from 'src/config/common';


const Jobs = () => {
  const { http } = AuthUser();
  const [jobs, setJobs] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(5);
  const [inputKey, setInputKey] = useState('');
  const navigate = useNavigate();

  const fetchApiJobs = async () => {
    try {
      const response = await http.get('/v1/tasks');
      return transformData(response.data.content);
    } catch (error) {
      console.error(error);
      sendToastError('Failed to fetch role. Server error occurred.');
      navigate('/403');
      setFetchError(true);
      return [];
    }
  };

  const transformData = (data) => {
    return data.map(job => {
      const usernames = job.implementers.map(impl => impl.username);
      return { ...job, username: usernames.join(', ') };
    });
  };

  useEffect(() => {
    fetchApiJobs()
      .then(apiJobs => {
        setJobs(apiJobs);
      })
      .catch(err => {
        console.error(err)
        setFetchError(true);
      });
  }, []);

  const handleAddJob = () => {
    navigate('/jobs/add');
  };

  const deleteJob = async (id) => {
    try {
      await http.delete(`/v1/tasks/${id}`);
      const updatedJob = jobs.filter(job => job.id !== id);
      setJobs(updatedJob);
      sendToast('Deleted job successfully.');
    } catch (error) {
      sendToastError('Failed to delete job.');
      navigate('/404');
      console.error(error);
    }
  };

  const totalJobs = jobs.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const filteredJobs = filteredValue(jobs, inputKey);
  const displayedJobs = filteredJobs.slice(startIndex, endIndex);

  return (
    <>
      <div className="container">
        <h2>Danh sách công việc</h2>
        <button type="button" className="btn btn-warning mb-3" onClick={handleAddJob}>
          Thêm
        </button>
      </div>
      <SearchInput placeholder="Tìm kiếm..." value={inputKey} onChange={(e) => setInputKey(e.target.value)} />
      <PageSizeDropdown options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} onChange={setJobsPerPage} />
      <CCard className="mb-4">
        <CCardBody>
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Tên công việc</th>
                  <th scope="col">Dự án</th>
                  <th scope="col">Người thực hiện</th>
                  <th scope="col">Ngày bắt đầu</th>
                  <th scope="col">Ngày kết thúc</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {displayedJobs.map((job, jobIndex) => (
                  <tr key={`job${startIndex + jobIndex}`}>
                    <td>{startIndex + jobIndex + 1}</td>
                    <td>{job.name}</td>
                    <td>Dự án CRM</td>
                    <td>{job.username}</td>
                    <td>{job.startDate}</td>
                    <td>{job.endDate}</td>
                    <td>{job.status}</td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        <Link to={`/jobs/update/${job.id}`} className="btn btn-primary mx-1">Sửa</Link>
                        <button className="btn btn-danger mx-1" onClick={() => deleteJob(job.id)}>Xoá</button>
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
};

export default Jobs;
