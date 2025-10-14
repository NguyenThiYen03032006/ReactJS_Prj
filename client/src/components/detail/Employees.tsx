import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store/store";
import { useEffect } from "react";
import { fetchUser } from "../../redux/reducers/user";
import { setActionTask } from "../../redux/reducers/modalTask";
import { fetchMember } from "../../redux/reducers/employees";

export default function Employees() {
  const dispatch = useDispatch<AppDispatch>();

  const idPrj: string | null = JSON.parse(
    localStorage.getItem("idDetail") || "null"
  );

  const listMember = useSelector(
    (state: RootState) => state.employees.listEmployees
  );
  const listUsers = useSelector((state: RootState) => state.listUser.lisUser);

  useEffect(() => {
    dispatch(fetchUser());
    if (idPrj) {
      dispatch(fetchMember(idPrj));
    }
  }, [dispatch, idPrj]);

  const membersArray = Array.isArray(listMember) ? listMember : [];

  const listEmployees = membersArray
    .map((m) => {
      const user = listUsers.find((u) => u.id === m.userId);
      return user ? { ...user, role: m.role } : null;
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

  return (
    <>
      <div className="head-right-top">
        <h3>Thành viên</h3>
        <button onClick={() => dispatch(setActionTask("addEmployee"))}>
          + Thêm thành viên
        </button>
      </div>

      <div className="list-employees">
        {listEmployees.slice(0, 2).map((e, index) => (
          <div className="employee" key={index}>
            <div className="imgEmlpoyee">{getInitials(e?.fullName || "")}</div>
            <div className="nameEmployee">
              <span>{e?.fullName}</span>
              <span className="roleEmployee">{e?.role}</span>
            </div>
          </div>
        ))}

        <div
          className="ellips"
          onClick={() => dispatch(setActionTask("employeeTask"))}
        >
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      </div>
    </>
  );
}
