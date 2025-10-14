import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../redux/store/store";
import { useEffect, useState } from "react";
import { fetchProject } from "../../redux/reducers/project";
import { fetchTask } from "../../redux/reducers/task";
import React from "react";

export default function MyTask_List() {
  const dispatch = useDispatch<AppDispatch>();
  const idUser: string | null = JSON.parse(localStorage.getItem("user") || "null");
  const allPrj = useSelector((state: RootState) => state.listProject.listProject);
  const allTask = useSelector((state: RootState) => state.listTask.listTask);

  // State lưu project nào đang mở
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  useEffect(() => {
    dispatch(fetchProject());
    dispatch(fetchTask());
  }, [dispatch]);

  const listPrj = allPrj.filter((prj) =>
    prj.members.some((p) => p.userId === idUser)
  );
  const listTask = allTask.filter((t) => t.assigneeId === idUser);

  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

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
                  <i className={`fa-solid fa-caret-${expandedProjects[prj.id] ? "down" : "right"}`}></i>
                  {prj.projectName}
                </th>
              </tr>

              {expandedProjects[prj.id] &&
                listTask
                  .filter((t) => t.projectId === prj.id)
                  .map((t) => (
                    <tr key={t.id}>
                      <td>{t.taskName}</td>
                      <td>
                        <span className={`priority ${
                          t.priority === "Cao" ? "high" : t.priority === "Thấp" ? "low" : "medium"
                        }`}>
                          {t.priority}
                        </span>
                      </td>
                      <td > 
                        <span style={{paddingRight:10}}>{t.status}</span> 
                      <i className="fa-regular fa-pen-to-square"></i>
                      </td>
                      <td className="date">{t.asignDate}</td>
                      <td className="date">{t.dueDate}</td>
                      <td>
                        <span className={`timeLine ${
                          t.progress === "Có rủi ro" ? "risky" : t.progress === "Trễ hạn" ? "overdue" : "on-time"
                        }`}>
                          {t.progress}
                        </span>
                      </td>
                    </tr>
                  ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
