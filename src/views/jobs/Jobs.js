import React, { useState, useEffect } from 'react';
import { CCard, CCardBody } from '@coreui/react';
import { Link } from 'react-router-dom';
import { AuthUser } from 'src/services/AuthUser';
import { roleCheck } from 'src/config/common';
import { handleAdd, handleDelete, handleUpdate, usePermissionState } from 'src/config/permissions';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { http, token, role } = AuthUser();

  const {
    haveAdd, setHaveAdd,
    haveUpdate, setHaveUpdate,
    haveDelete, setHaveDelete,
    haveView, setHaveView
  } = usePermissionState();

  const fetchApiJobs = async () => {
    try {
      const response = await http.get('/v1/tasks');
      return transformData(response.data.content);
    } catch (error) {
      console.error(error);
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
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (token && role === roleCheck.staff) {
      setHaveAdd(false);
      setHaveUpdate(false);
      setHaveDelete(false);
      setHaveView(true);
    } else {
      setHaveAdd(true);
      setHaveUpdate(true);
      setHaveDelete(true);
      setHaveView(true);
    }
  }, [token, role]);

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
              Sửa
            </button>
          ) : (
            <Link to={'/jobs/add'}>
              <button type="button" className="btn btn-warning mb-3">Thêm</button>
            </Link>
          )
        }
      </>
    )
  }

  return (
    <>
      <div className="container">
        <h2>Danh sách công việc</h2>
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
                {jobs.map((job, jobIndex) => (
                  <tr key={`job${jobIndex}`}>
                    <td>{jobIndex + 1}</td>
                    <td>{job.name}</td>
                    <td>Dự án CRM</td>
                    <td>{job.username}</td>
                    <td>{job.startDate}</td>
                    <td>{job.endDate}</td>
                    <td>{job.status}</td>
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
                            <Link to={`/jobs/update/${job.id}`} className="btn btn-primary mx-1"
                            >
                              Sửa
                            </Link>
                          )
                        }
                        <button className="btn btn-danger mx-1"
                          onClick={() => permissionDelete()}
                        >
                          Xoá
                        </button>
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

export default Jobs;
