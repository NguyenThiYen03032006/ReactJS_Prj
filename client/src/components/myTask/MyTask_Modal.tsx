import React from 'react'

export default function MyTask_Modal() {
  return (
     <div className="delete-container" id="delete-container">
          <div className="delete">
            <div className="delete-navbar">
              <h3>Cập nhật trạng thái</h3>
              <i className="fa-solid fa-xmark x exit" ></i>
            </div>
            <div className="delete-body">
              <p>Xác nhận cập nhật trạng thái nhiệm vụ</p>
            </div>
            <div className="delete-footer">
              <button className="btn-cancel" >Huỷ </button>
              <button className="btn-save" >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
  )
}

