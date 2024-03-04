import React from 'react'
import { Link } from 'react-router-dom'
import { CCard, CCardBody } from '@coreui/react'

const Profile = () => {
    return (
        <>
            <div className="container">
                <h3>Chi tiết thành viên</h3>
                <div className="card">
                    <div className="card-header">
                        Nguyễn Văn Tho
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <p><strong>Email:</strong> tho.nguyen@gmail.com</p>
                                <p><strong>Số điện thoại:</strong> 0912345678</p>
                                <p><strong>Quốc gia:</strong> Việt Nam</p>
                            </div>
                            <div className="col-sm-6">
                                <p><strong>Ngày tham gia:</strong> 30/05/2023</p>
                                <p><strong>Chức vụ:</strong> Nhân viên</p>
                                <p><strong>Đã hoàn thành:</strong> 20%</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-3'>
                    <div>
                        <h4>Danh sách công việc</h4>
                    </div>
                    <CCard className="mb-4">
                        <CCardBody>
                            <table className="table text-center justify-content-center">
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
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Phân tích dự án</td>
                                        <td>Dự án CRM</td>
                                        <td>Nguyễn Văn Tèo</td>
                                        <td>22/05/2019</td>
                                        <td>30/05/2019</td>
                                        <td>Đã hoàn thành</td>
                                        <td>
                                            <button type="button" className="btn btn-success">Cập nhật</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </CCardBody>
                    </CCard>
                </div>
            </div>

        </>
    )
}

export default Profile