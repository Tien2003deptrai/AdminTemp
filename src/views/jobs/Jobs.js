import React from 'react';
import { CCard, CCardBody } from '@coreui/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { AuthUser } from 'src/services/AuthUser';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { http } = AuthUser();

  const fetchApiJobs = async () => {
    return await http.get('/v1/tasks')
      .then(res => { return transformData(res.data.content) })
      .catch(err => console.error(err))
  }

  const transformData = (data) => {
    return data.map(job => {
      const usernames = job.implementers.map(impl => impl.username);
      return { ...job, username: usernames.join(', ') };
    });
  };

  useEffect(() => {
    fetchApiJobs()
      .then(apiJob => {
        setJobs(apiJob)
        console.log(jobs);
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <div className="container">
        <h2>Danh sách công việc</h2>
        <Link to={'/jobs/add'}>
          <button type="button" className="btn btn-warning mb-3">Thêm</button>
        </Link>
      </div>
      <CCard className="mb-4">
        <CCardBody>
          <div className="table-responsive d-flex justify-content-center">
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
                {
                  jobs?.length > 0 &&
                  jobs.map((job, jobIndex) => (
                    <tr key={`job${jobIndex}`}>
                      <th scope="row">{jobIndex + 1}</th>
                      <td>{job.name}</td>
                      <td>Dự án CRM</td>
                      <td>{job.username}</td>
                      <td>{job.startDate}</td>
                      <td>{job.endDate}</td>
                      <td>{job.status}</td>
                      <td>
                        <div className="d-grid gap-2 d-md-block">
                          <Link to={`/jobs/update/${job.id}`}>
                            <button type="button" className="btn btn-primary mb-2">Sửa</button>
                          </Link>
                          <button type="button" className="btn btn-danger mb-2 ms-2">Xoá</button>
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
};

export default Jobs;
