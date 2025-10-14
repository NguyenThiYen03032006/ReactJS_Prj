import { useDispatch, useSelector } from "react-redux";
import {type AppDispatch, type RootState } from "../../../redux/store/store";
import { clearActionTask } from "../../../redux/reducers/modalTask";
import { deleteTask } from "../../../redux/reducers/task";

export default function Detail_ModalDelete() {
  const dispatch= useDispatch<AppDispatch>()
  const taskId= useSelector((state:RootState)=>state.modalTask.taskIdToDelete)
  async function handleConfirmDelete(){
    if(!taskId) return
    await dispatch(deleteTask(taskId)) // xoa tren APT va redux
    dispatch(clearActionTask())// dong modal
  }
  
  return (
    <div className="delete-container" id="delete-container">
      <div className="delete">
        <div className="delete-navbar">
          <h3>Xác nhận xoá</h3>
          <i className="fa-solid fa-xmark x exit" onClick={()=>{dispatch(clearActionTask())}}></i>
        </div>
        <div className="delete-body">
          <p>Bạn chắc chắn muốn xoá nhiệm vụ này?</p>
        </div>
        <div className="delete-footer">
          <button className="btn-cancel" onClick={()=>{dispatch(clearActionTask())}}>Huỷ </button>
          <button className="btn-delete btn" id="confirm-delete-btn" onClick={handleConfirmDelete}>
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
}
