import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { type AppDispatch, type RootState } from "../../../redux/store/store";
import { clearActionTask } from "../../../redux/reducers/modalTask";
import { fixTask } from "../../../redux/reducers/task";

export default function Detail_ModalFix() {
  const dispatch = useDispatch<AppDispatch>();
  const listAllTask = useSelector((state: RootState) => state.listTask.listTask);
  const idTask = useSelector((state: RootState) => state.modalTask.taskIdToFix);

  // Task cần sửa
  const taskFix = listAllTask.find((t) => t.id === idTask);

  // State cho input
  const [taskData, setTaskData] = useState({
    taskName: "",
    assigneeName: "",
    assigneeId: "",
    status: "",
    asignDate: "",
    dueDate: "",
    priority: "",
    progress: "",
  });

  // State lỗi từng input
  const [errors, setErrors] = useState({
    taskName: "",
    assigneeName: "",
    status: "",
    asignDate: "",
    dueDate: "",
    priority: "",
    progress: "",
  });

  // Gán dữ liệu khi mở modal
  useEffect(() => {
    if (taskFix) {
      setTaskData({
        taskName: taskFix.taskName,
        assigneeName: taskFix.assigneeName,
        assigneeId: taskFix.assigneeId,
        status: taskFix.status,
        asignDate: taskFix.asignDate,
        dueDate: taskFix.dueDate,
        priority: taskFix.priority,
        progress: taskFix.progress,
      });
    }
  }, [taskFix]);

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setTaskData((prev) => ({ ...prev, [id]: value }));

    // Khi người dùng nhập lại thì xoá lỗi
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  // ✅ Validate (hiển thị lỗi dưới input)
  const validate = () => {
    let valid = true;
    const newError = {
      taskName: "",
      assigneeName: "",
      status: "",
      asignDate: "",
      dueDate: "",
      priority: "",
      progress: "",
    };

    const { taskName, assigneeName, status, asignDate, dueDate, priority, progress } = taskData;

    if (!taskName.trim()) {
      newError.taskName = "Vui lòng nhập tên nhiệm vụ!";
      valid = false;
    } else if (taskName.trim().length < 3) {
      newError.taskName = "Tên nhiệm vụ phải có ít nhất 3 ký tự!";
      valid = false;
    }

    if (!assigneeName) {
      newError.assigneeName = "Vui lòng chọn người phụ trách!";
      valid = false;
    }

    if (!status) {
      newError.status = "Vui lòng chọn trạng thái!";
      valid = false;
    }

    if (!asignDate) {
      newError.asignDate = "Vui lòng chọn ngày bắt đầu!";
      valid = false;
    }

    if (!dueDate) {
      newError.dueDate = "Vui lòng chọn hạn cuối!";
      valid = false;
    } else {
      const start = new Date(asignDate);
      const end = new Date(dueDate);
      if (asignDate && end <= start) {
        newError.dueDate = "Hạn chót phải sau ngày bắt đầu!";
        valid = false;
      }
    }

    if (!priority) {
      newError.priority = "Vui lòng chọn độ ưu tiên!";
      valid = false;
    }

    if (!progress) {
      newError.progress = "Vui lòng chọn tiến độ!";
      valid = false;
    }

    setErrors(newError);
    return valid;
  };

  // Lưu sửa
  const handleSave = async () => {
    if (!taskFix) return;
    if (!validate()) return;

    const updatedTask = {
      ...taskFix,
      ...taskData,
      priority: taskData.priority as "Cao" | "Trung bình" | "Thấp",
      progress: taskData.progress as "Đúng tiến độ" | "Có rủi ro" | "Trễ hạn",
      status: taskData.status as "To do" | "In Progress" | "Pending" | "Done",
    };

    await dispatch(fixTask(updatedTask));
    dispatch(clearActionTask());
  };

  return (
    <div className="fix-container" id="fix-container">
      <div className="fix-add">
        <div className="fix-add-navbar">
          <p id="textFixAdd">Sửa nhiệm vụ</p>
          <i
            className="fa-solid fa-xmark x"
            onClick={() => dispatch(clearActionTask())}
          ></i>
        </div>

        <div className="fix-add-body">
          {/* Tên nhiệm vụ */}
          <div className="fix-add-body-child">
            <p>Tên nhiệm vụ</p>
            <input
              id="taskName"
              className={`child ${errors.taskName ? "error-input" : ""}`}
              value={taskData.taskName}
              onChange={handleChange}
              placeholder="Nhập tên nhiệm vụ"
            />
            {errors.taskName && (
              <p className="error-text">{errors.taskName}</p>
            )}
          </div>

          {/* Người phụ trách */}
          <div className="fix-add-body-child">
            <p>Người phụ trách</p>
            <select
              id="assigneeName"
              className={`child ${errors.assigneeName ? "error-input" : ""}`}
              value={taskData.assigneeName}
              onChange={handleChange}
            >
              <option value="">Chọn người phụ trách</option>
              <option value="An Nguyễn">An Nguyễn</option>
              <option value="Yến Nguyễn">Yến Nguyễn</option>
              <option value="Bảo Khánh">Bảo Khánh</option>
            </select>
            <i className="fa-solid fa-angle-down"></i>
            {errors.assigneeName && (
              <p className="error-text">{errors.assigneeName}</p>
            )}
          </div>

          {/* Trạng thái */}
          <div className="fix-add-body-child">
            <p>Trạng thái</p>
            <select
              id="status"
              className="child"
              style={{ border: errors.status ? "1px solid red" : "" }}
              value={taskData.status}
              onChange={handleChange}
            >
              <option value="">Chọn trạng thái</option>
              <option value="To do">To do</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
            <i className="fa-solid fa-angle-down"></i>
            
          </div>

          {/* Ngày bắt đầu */}
          <div className="fix-add-body-child">
            <p>Ngày bắt đầu</p>
            <input
              id="asignDate"
              className={`child ${errors.asignDate ? "error-input" : ""}`}
              type="date"
              value={taskData.asignDate}
              onChange={handleChange}
            />
            {errors.asignDate && (
              <p className="error-text">{errors.asignDate}</p>
            )}
          </div>

          {/* Hạn cuối */}
          <div className="fix-add-body-child">
            <p>Hạn cuối</p>
            <input
              id="dueDate"
              className={`child ${errors.dueDate ? "error-input" : ""}`}
              type="date"
              value={taskData.dueDate}
              onChange={handleChange}
            />
             {errors.dueDate && <p className="error-text">{errors.dueDate}</p>}
          </div>

          {/* Độ ưu tiên */}
          <div className="fix-add-body-child">
            <p>Độ ưu tiên</p>
            <select
              id="priority"
               className={`child ${errors.priority ? "error-input" : ""}`}
              value={taskData.priority}
              onChange={handleChange}
            >
              <option value="">Chọn độ ưu tiên</option>
              <option value="Thấp">Thấp</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Cao">Cao</option>
            </select>
            <i className="fa-solid fa-angle-down"></i>
            {errors.priority && (
              <p className="error-text">{errors.priority}</p>
            )}
          </div>

          {/* Tiến độ */}
          <div className="fix-add-body-child">
            <p>Tiến độ</p>
            <select
              id="progress"
              className={`child ${errors.progress ? "error-input" : ""}`}
              value={taskData.progress}
              onChange={handleChange}
            >
              <option value="">Chọn tiến độ</option>
              <option value="Đúng tiến độ">Đúng tiến độ</option>
              <option value="Có rủi ro">Có rủi ro</option>
              <option value="Trễ hạn">Trễ hạn</option>
            </select>
            <i className="fa-solid fa-angle-down"></i>
            {errors.progress && (
              <p className="error-text">{errors.progress}</p>
            )}
          </div>
        </div>

        <div className="fix-add-footer">
          <button className="btn-cancel" onClick={() => dispatch(clearActionTask())}>
            Huỷ
          </button>
          <button className="btn-save" onClick={handleSave}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
