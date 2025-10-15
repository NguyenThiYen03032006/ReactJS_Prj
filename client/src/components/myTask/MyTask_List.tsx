import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../redux/store/store";
import { useEffect, useState } from "react";
import { fetchProject } from "../../redux/reducers/project";
import { fetchTask } from "../../redux/reducers/task";
import React from "react";
import { setActionTask } from "../../redux/reducers/modalTask";

export default function MyTask_List() {
  const dispatch = useDispatch<AppDispatch>();
  const idUser: string | null = JSON.parse(
    localStorage.getItem("user") || "null"
  );
  const allPrj = useSelector(
    (state: RootState) => state.listProject.listProject
  );
  const allTask = useSelector((state: RootState) => state.listTask.listTask);
  const keyword = useSelector((state: RootState) => state.myTask.search);
  const sortBy = useSelector((state: RootState) => state.myTask.sortBy);
  // State lưu project nào đang mở
  const [expandedProjects, setExpandedProjects] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    dispatch(fetchProject());
    dispatch(fetchTask());
  }, [dispatch]);

  const listPrj = allPrj.filter((prj) =>
    prj.members.some((p) => p.userId === idUser)
  );
  let listTask = allTask.filter((t) => t.assigneeId === idUser);
  // loc tim kiem
  if (keyword.trim() !== "") {
    const lowerKeyword = keyword.toLowerCase();
    listTask = listTask.filter((t) =>
      t.taskName.toLowerCase().includes(lowerKeyword)
    );
  }
  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };
  // sap xep
  // Sắp xếp
  const priorityOrder: Record<string, number> = {
    Cao: 3,
    "Trung bình": 2,
    Thấp: 1,
  };
  const progressOrder: Record<string, number> = {
    "Trễ hạn": 3,
    "Có rủi ro": 2,
    "Đúng tiến độ": 1,
  };

  if (sortBy === "priority") {
    listTask.sort(
      (a, b) =>
        (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
    );
  } else if (sortBy === "progress") {
    listTask.sort(
      (a, b) =>
        (progressOrder[b.progress] || 0) - (progressOrder[a.progress] || 0)
    );
  }
function handleClick(){
    dispatch(setActionTask('myTask'))
  }
  return (
    <div className="body-container">
      <h3>Danh Sách Nhiệm Vụ</h3>
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "223px" }}>Tên Nhiệm Vụ</th>
            <th style={{ width: "100px" }}>Ưu Tiên</th>
            <th style={{ width: "160px" }}>Trạng thái </th>
            <th style={{ width: "132px" }}>Ngày Bắt Đầu</th>
            <th style={{ width: "132px" }}>Hạn Chót</th>
            <th style={{ width: "100px" }}>Tiến Độ</th>
          </tr>
        </thead>
        <tbody>
          {listPrj.map((prj) => (
            <React.Fragment key={prj.id}>
              <tr
                className="task-list"
                style={{ cursor: "pointer" }}
                onClick={() => toggleProject(prj.id)}
              >
                <th colSpan={8}>
                  <i
                    className={`fa-solid fa-caret-${
                      expandedProjects[prj.id] ? "down" : "right"
                    }`}
                  ></i>
                  {prj.projectName}
                </th>
              </tr>

              {expandedProjects[prj.id] &&
                listTask
                  .filter((t) => t.projectId === prj.id)
                  .map((t) => {
                    let priorityClass = "priority ";
                    if (t.priority === "Thấp") priorityClass += "low";
                    else if (t.priority === "Cao") priorityClass += "high";
                    else priorityClass += "medium";

                    let progressClass = "timeLine ";
                    if (t.progress === "Có rủi ro") progressClass += "risky";
                    else if (t.progress === "Trễ hạn")
                      progressClass += "overdue";
                    else progressClass += "on-time";
                    return (
                      <tr key={t.id}>
                        <td>{t.taskName}</td>
                        <td>
                          <span className={priorityClass}>{t.priority}</span>
                        </td>
                        <td>
                          <span style={{ paddingRight: 10 }}>{t.status}</span>
                          <i className="fa-regular fa-pen-to-square" onClick={handleClick}></i>
                        </td>
                        <td className="date">{t.asignDate}</td>
                        <td className="date">{t.dueDate}</td>
                        <td>
                          <span className={progressClass}>{t.progress}</span>
                        </td>
                      </tr>
                    );
                  })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
