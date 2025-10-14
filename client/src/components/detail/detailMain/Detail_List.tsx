import { useState } from "react";
import List_Done from "./detailList/List_Done";
import List_InProgress from "./detailList/List_InProgress";
import List_Pending from "./detailList/List_Pending";
import List_Todo from "./detailList/List_Todo";

export default function Detail_List() {
  // State quản lý trạng thái mở/đóng của từng nhóm
  const [openSections, setOpenSections] = useState({
    todo: true,
    inProgress: true,
    pending: false,
    done: false,
  });

  // Hàm toggle khi click icon
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="body-container">
      <h3>Danh Sách Nhiệm Vụ</h3>
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "223px" }}>Tên Nhiệm Vụ</th>
            <th style={{ width: "160px" }}>Người Phụ Trách</th>
            <th style={{ width: "100px" }}>Ưu Tiên</th>
            <th style={{ width: "132px" }}>Ngày Bắt Đầu</th>
            <th style={{ width: "132px" }}>Hạn Chót</th>
            <th style={{ width: "100px" }}>Tiến Độ</th>
            <th colSpan={2}>Hành Động</th>
          </tr>
        </thead>

        <tbody>
          {/* To do */}
          <tr
            className="to-do task-list"
            onClick={() => toggleSection("todo")}
            style={{ cursor: "pointer" }}
          >
            <th colSpan={8}>
              <i
                className={`fa-solid ${
                  openSections.todo ? "fa-caret-down" : "fa-caret-right"
                }`}
              ></i>
              <b>To do</b>
            </th>
          </tr>
          {openSections.todo && <List_Todo />}

          {/* In progress */}
          <tr
            className="in-progress task-list"
            onClick={() => toggleSection("inProgress")}
            style={{ cursor: "pointer" }}
          >
            <th colSpan={8}>
              <i
                className={`fa-solid ${
                  openSections.inProgress ? "fa-caret-down" : "fa-caret-right"
                }`}
              ></i>
              <b>In progress</b>
            </th>
          </tr>
          {openSections.inProgress && <List_InProgress />}

          {/* Pending */}
          <tr
            className="pending task-list"
            onClick={() => toggleSection("pending")}
            style={{ cursor: "pointer" }}
          >
            <th colSpan={8}>
              <i
                className={`fa-solid ${
                  openSections.pending ? "fa-caret-down" : "fa-caret-right"
                }`}
              ></i>
              <b>Pending</b>
            </th>
          </tr>
          {openSections.pending && <List_Pending />}

          {/* Done */}
          <tr
            className="done task-list"
            onClick={() => toggleSection("done")}
            style={{ cursor: "pointer" }}
          >
            <th colSpan={8}>
              <i
                className={`fa-solid ${
                  openSections.done ? "fa-caret-down" : "fa-caret-right"
                }`}
              ></i>
              <b>Done</b>
            </th>
          </tr>
          {openSections.done && <List_Done />}
        </tbody>
      </table>
    </div>
  );
}
