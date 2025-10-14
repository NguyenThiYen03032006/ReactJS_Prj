import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../redux/store/store";
import { useEffect } from "react";
import { fetchTask } from "../../../../redux/reducers/task";
import { setActionTask, setTaskIdToDelete, setTaskIdToFix } from "../../../../redux/reducers/modalTask";

export default function List_Done() {
  const idPrj: string | null = JSON.parse(localStorage.getItem("idDetail") || "null");
  const allTask = useSelector((state: RootState) => state.listTask.listTask);
  const sortBy = useSelector((state: RootState) => state.listTask.sortBy);
  const keyword = useSelector((state: RootState) => state.modalTask.search); // từ khóa search
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch]);

  // Lọc task theo project và status "To do"
  let listTask = allTask.filter((t) => t.projectId === idPrj && t.status === "Done");

  // Lọc theo từ khóa tìm kiếm (theo tên task)
  if (keyword.trim() !== "") {
    const lowerKeyword = keyword.toLowerCase();
    listTask = listTask.filter((t) => t.taskName.toLowerCase().includes(lowerKeyword));
  }

  // Sắp xếp
  const priorityOrder: Record<string, number> = { "Cao": 3, "Trung bình": 2, "Thấp": 1 };
  const progressOrder: Record<string, number> = { "Trễ hạn": 3, "Có rủi ro": 2, "Đúng tiến độ": 1 };

  if (sortBy === "priority") {
    listTask.sort((a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0));
  } else if (sortBy === "progress") {
    listTask.sort((a, b) => (progressOrder[b.progress] || 0) - (progressOrder[a.progress] || 0));
  }

  function handleFix(id: string) {
    dispatch(setTaskIdToFix(id));
    dispatch(setActionTask("fixTask"));
  }

  function handleDelete(id: string) {
    dispatch(setTaskIdToDelete(id));
    dispatch(setActionTask("deleteTask"));
  }

  return (
    <>
      {listTask.map((l, index) => {
        let priorityClass = "priority ";
        if (l.priority === "Thấp") priorityClass += "low";
        else if (l.priority === "Cao") priorityClass += "high";
        else priorityClass += "medium";

        let progressClass = "timeLine ";
        if (l.progress === "Có rủi ro") progressClass += "risky";
        else if (l.progress === "Trễ hạn") progressClass += "overdue";
        else progressClass += "on-time";

        return (
          <tr key={index}>
            <td>{l.taskName}</td>
            <td>{l.assigneeName}</td>
            <td>
              <span className={priorityClass}>{l.priority}</span>
            </td>
            <td className="date">{l.asignDate}</td>
            <td className="date">{l.dueDate}</td>
            <td>
              <span className={progressClass}>{l.progress}</span>
            </td>
            <td>
              <button className="btn btn-fix" onClick={() => handleFix(l.id)}>Sửa</button>
            </td>
            <td>
              <button className="btn btn-delete" onClick={() => handleDelete(l.id)}>Xoá</button>
            </td>
          </tr>
        );
      })}
    </>
  );
}
