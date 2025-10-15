import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store/store";
import { clearActionTask } from "../../redux/reducers/modalTask";

export default function MyTask_Modal() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="delete-container" id="delete-container">
      <div className="delete">
        <div className="delete-navbar">
          <h3>Cập nhật trạng thái</h3>
          <i
            className="fa-solid fa-xmark x exit"
            onClick={() => dispatch(clearActionTask())}
          ></i>
        </div>
        <div className="delete-body">
          <p>Xác nhận cập nhật trạng thái nhiệm vụ</p>
        </div>
        <div className="delete-footer">
          <button
            className="btn-cancel"
            onClick={() => dispatch(clearActionTask())}
          >
            Huỷ{" "}
          </button>
          <button className="btn-save">Xác nhận</button>
        </div>
      </div>
    </div>
  );
}
