import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../../redux/store/store";
import { clearActionTask } from "../../../redux/reducers/modalTask";
import { addTask, type Task } from "../../../redux/reducers/task";
import '../../../css/modalClass.css'
export default function Detail_ModalAdd() {
  const dispatch = useDispatch<AppDispatch>();

  const [taskName, setTaskName] = useState("");
  const [assigneeName, setAssigneeName] = useState("");
  const [statusInput, setStatusInput] = useState<
    "To do" | "In Progress" | "Pending" | "Done"
  >("To do");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState<"Thấp" | "Trung bình" | "Cao" | "">(
    ""
  );
  const [progress, setProgress] = useState<
    "Đúng tiến độ" | "Có rủi ro" | "Trễ hạn" | ""
  >("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
// hien thanh vien tuong ung
const employees= useSelector((state:RootState)=>state.employees.listEmployees)
const listUsers = useSelector((state: RootState) => state.listUser.lisUser);
const listEmployees = employees
    .map((m) => {
      const user = listUsers.find((u) => u.id === m.userId);
      return user ? { ...user, role: m.role } : null;
    })
    .filter(Boolean);
  // Validate form
  function validateForm(): boolean {
    const newErrors: { [key: string]: string } = {};
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (!taskName) newErrors.taskName = "Vui lòng nhập tên nhiệm vụ!";
    else if (taskName.trim().length < 3)
      newErrors.taskName = "Tên nhiệm vụ phải có ít nhất 3 ký tự!";

    if (!assigneeName) newErrors.assigneeName = "Vui lòng chọn người phụ trách!";
    if (!priority) newErrors.priority = "Vui lòng chọn độ ưu tiên!";
    if (!progress) newErrors.progress = "Vui lòng chọn tiến độ!";
    if (!startDate) newErrors.startDate = "Vui lòng chọn ngày bắt đầu!";
    if (!endDate) newErrors.endDate = "Vui lòng chọn hạn chót!";

    if (start < today)
      newErrors.startDate = "Ngày bắt đầu phải lớn hơn hoặc bằng hôm nay!";
    if (end <= start)
      newErrors.endDate = "Hạn chót phải lớn hơn ngày bắt đầu!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // mm-dd
  function formatDateToMMDD(dateStr: string): string {
    const [, month, day] = dateStr.split("-");
    return `${month}-${day}`;
  }

  function handleAdd() {
    if (!validateForm()) return;
    const u= listUsers.find((u)=>u.fullName===assigneeName)
    const newTask: Task = {
      id: Date.now().toString(),
      taskName,
      assigneeId: u?.id as string,
      assigneeName,
      projectId: JSON.parse(localStorage.getItem("idDetail") || "0"),
      asignDate: formatDateToMMDD(startDate),
      dueDate: formatDateToMMDD(endDate),
      priority: priority as "Thấp" | "Trung bình" | "Cao",
      progress: progress as "Đúng tiến độ" | "Có rủi ro" | "Trễ hạn",
      status: statusInput,
    };

    dispatch(addTask(newTask));
    dispatch(clearActionTask());
    setTaskName("");
    setAssigneeName("");
    setStartDate("");
    setEndDate("");
    setPriority("");
    setProgress("");
    setErrors({});
  }

  return (
    <div className="fix-container" id="fix-container">
      <div className="fix-add">
        <div className="fix-add-navbar">
          <p id="textFixAdd">Thêm nhiệm vụ</p>
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
              className={`child ${errors.taskName ? "error-input" : ""}`}
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
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
              className={`child ${errors.assigneeName ? "error-input" : ""}`}
              value={assigneeName}
              onChange={(e) => setAssigneeName(e.target.value)}
            >
              <option value="">Chọn người phụ trách</option>
              {
                listEmployees.map((e,index)=>{
                  return(
                    <option key={index} value={e?.fullName}>{e?.fullName}</option>
                  )
                })
              }
              {/* <option value="An Nguyễn">An Nguyễn</option>
              <option value="Yến Nguyễn">Yến Nguyễn</option>
              <option value="Bảo Khánh">Bảo Khánh</option> */}
            </select>
            {errors.assigneeName && (
              <p className="error-text">{errors.assigneeName}</p>
            )}
          </div>

          {/* Trạng thái */}
          <div className="fix-add-body-child">
            <p>Trạng thái</p>
            <select
              className="child"
              value={statusInput}
              onChange={(e) =>
                setStatusInput(
                  e.target.value as "To do" | "In Progress" | "Pending" | "Done"
                )
              }
            >
              <option value="To do">To do</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
          </div>

          {/* Ngày bắt đầu */}
          <div className="fix-add-body-child">
            <p>Ngày bắt đầu</p>
            <input
              className={`child ${errors.startDate ? "error-input" : ""}`}
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {errors.startDate && (
              <p className="error-text">{errors.startDate}</p>
            )}
          </div>

          {/* Hạn cuối */}
          <div className="fix-add-body-child">
            <p>Hạn cuối</p>
            <input
              className={`child ${errors.endDate ? "error-input" : ""}`}
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {errors.endDate && <p className="error-text">{errors.endDate}</p>}
          </div>

          {/* Ưu tiên */}
          <div className="fix-add-body-child">
            <p>Độ ưu tiên</p>
            <select
              className={`child ${errors.priority ? "error-input" : ""}`}
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as "Thấp" | "Trung bình" | "Cao" | "")
              }
            >
              <option value="">Chọn độ ưu tiên</option>
              <option value="Thấp">Thấp</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Cao">Cao</option>
            </select>
            {errors.priority && (
              <p className="error-text">{errors.priority}</p>
            )}
          </div>

          {/* Tiến độ */}
          <div className="fix-add-body-child">
            <p>Tiến độ</p>
            <select
              className={`child ${errors.progress ? "error-input" : ""}`}
              value={progress}
              onChange={(e) =>
                setProgress(
                  e.target.value as
                    | "Đúng tiến độ"
                    | "Có rủi ro"
                    | "Trễ hạn"
                    | ""
                )
              }
            >
              <option value="">Chọn tiến độ</option>
              <option value="Đúng tiến độ">Đúng tiến độ</option>
              <option value="Có rủi ro">Có rủi ro</option>
              <option value="Trễ hạn">Trễ hạn</option>
            </select>
            {errors.progress && (
              <p className="error-text">{errors.progress}</p>
            )}
          </div>
        </div>

        <div className="fix-add-footer">
          <button
            className="btn-cancel"
            onClick={() => dispatch(clearActionTask())}
          >
            Huỷ
          </button>
          <button className="btn-save" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
