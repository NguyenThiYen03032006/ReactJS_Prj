import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store/store";
import { clearAction } from "../../../redux/reducers/modal";
import { deleteProject } from "../../../redux/reducers/project";

export default function Team_ModalDelete() {
 const dispatch = useDispatch<AppDispatch>();
  const projectId = useSelector(
    (state: RootState) => state.modal.projectIdToDelete
  );

  async function handleConfirmDelete() {
    if (!projectId) return;
    await dispatch(deleteProject(projectId)); // xóa trên API + Redux
    dispatch(clearAction()); // đóng modal
  }
  return (
    <div className="delete-container" id="delete-container">
      <div className="delete">
        <div className="delete-navbar">
          <h3>Xác nhận xoá</h3>
          <i className="fa-solid fa-xmark x exit" onClick={()=>dispatch(clearAction())}></i>
        </div>
        <div className="delete-body">
          <p>Bạn chắc chắn muốn xoá dự án này?</p>
        </div>
        <div className="delete-footer">
          <button className="btn-cancel" onClick={()=>dispatch(clearAction())}>Huỷ </button>
          <button className="btn-delete btn" id="confirm-delete-btn" onClick={handleConfirmDelete}>
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
}
