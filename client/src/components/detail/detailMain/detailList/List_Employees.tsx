import { useDispatch, useSelector } from "react-redux";
import {
  type AppDispatch,
  type RootState,
} from "../../../../redux/store/store";
import { clearActionTask } from "../../../../redux/reducers/modalTask";
import { useEffect, useState } from "react";
import { fetchUser } from "../../../../redux/reducers/user";
import {
    deleteMember,
  fetchMember,
  updateMemberRole,
} from "../../../../redux/reducers/employees";

export default function List_Employees() {
  const dispatch = useDispatch<AppDispatch>();
  const idPrj: string | null = JSON.parse(
    localStorage.getItem("idDetail") || "null"
  );

  const listMember = useSelector(
    (state: RootState) => state.employees.listEmployees
  );
  const listUsers = useSelector((state: RootState) => state.listUser.lisUser);

  const [roles, setRoles] = useState<Record<string, string>>({});

  useEffect(() => {
    dispatch(fetchUser());
    if (idPrj) {
      dispatch(fetchMember(idPrj));
    }
  }, [dispatch, idPrj]);

  useEffect(() => {
    const initialRoles: Record<string, string> = {};
    listMember.forEach((m) => (initialRoles[m.userId] = m.role));
    setRoles(initialRoles);
  }, [listMember]);

  const membersArray = Array.isArray(listMember) ? listMember : [];

  const listEmployees = membersArray
    .map((m) => {
      const user = listUsers.find((u) => u.id === m.userId);
      return user ? { ...user, role: m.role, id: m.userId } : null;
    })
    .filter(Boolean);

  const getInitials = (name: string) => {
    if (!name) return "";
    const parts = name.trim().split(" ").filter(Boolean);
    const lastTwo = parts.slice(-2);
    return lastTwo
      .map((p) => p[0])
      .join("")
      .toUpperCase();
  };

  // Hàm xử lý khi bấm Lưu
  const handleSave = () => {
    if (!idPrj) return;

    // Duyệt tất cả member và cập nhật role nếu có thay đổi
    for (const userId in roles) {
      const newRole = roles[userId];
      const oldRole = listMember.find((m) => m.userId === userId)?.role;
      if (oldRole !== newRole) {
        dispatch(updateMemberRole({ idPrj, userId, newRole }));
      }
    }
    dispatch(clearActionTask())
  };

  return (
    <div className="delete-container" id="delete-container">
      <div className="employee-container">
        <div className="delete-navbar">
          <h3>Thành viên dự án</h3>
          <i
            className="fa-solid fa-xmark x exit"
            onClick={() => dispatch(clearActionTask())}
          ></i>
        </div>

        <table className="table-e">
          <thead>
            <tr className="tr-e">
              <th className="th-e">Thành viên</th>
              <th className="th-e">Vai trò</th>
            </tr>
          </thead>
          <tbody>
            {listEmployees.map((e,index) => {
              return (
                <tr key={index} className="tr-e">
                  <td className="td-e">
                    <div className="imgEmlpoyee">{getInitials(e?.fullName || "")}</div>
                    <div className="nameEmployee">
                      <span style={{ textAlign: "left" }}>{e?.fullName}</span>
                      <span className="roleEmployee">{e?.email}</span>
                    </div>
                  </td>
                  <td className="td-e">
                    <input
                      type="text"
                      value={roles[e?.id || ''] || ""}
                      onChange={(ev) =>
                        setRoles({ ...roles, [e?.id || '']: ev.target.value })
                      }
                    />
                    <i
                      className="fa-regular fa-trash-can"
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() =>
                        dispatch(deleteMember({ idPrj: idPrj!, userId: e?.id ||'' }))
                      }
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="employee-footer">
          <button
            className="btn-cancel"
            onClick={() => dispatch(clearActionTask())}
          >
            Đóng
          </button>
          <button className="btn-save" onClick={handleSave}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
