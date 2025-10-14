import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store/store";
import { clearActionTask } from "../../../redux/reducers/modalTask";
import { useState } from "react";
import "../../../css/modalClass.css";
import { addMember, type Employee } from "../../../redux/reducers/employees";

export default function Detail_AddMember() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const listMember = useSelector(
    (state: RootState) => state.employees.listEmployees
  );
  const listUser = useSelector((state: RootState) => state.listUser.lisUser);
  const idPrj: string | null = JSON.parse(
    localStorage.getItem("idDetail") || "null"
  );

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email.trim()) newErrors.email = "Vui lòng nhập email!";
    else if (!emailRegex.test(email))
      newErrors.email = "Email không hợp lệ (vd: example@gmail.com)";
    else if (email.length > 50)
      newErrors.email = "Email không được vượt quá 50 ký tự!";

    if (!role.trim()) newErrors.role = "Vui lòng nhập vai trò!";
    else if (role.length > 30)
      newErrors.role = "Vai trò không được vượt quá 30 ký tự!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleAdd = () => {
    if (!validateForm()) return;
    if(!idPrj)return
    // tim user theo email
    const foundUser = listUser.find((u) => u.email === email.trim());
    if (!foundUser) {
      setErrors({ email: "Không tìm thấy người dùng với email này!" });
      return;
    }
// ktra xem member co trong prj chua
    const index= listMember.findIndex((e)=>e.userId===foundUser.id)
    if(index!==-1) return;
    const newEmployee: Employee={
      userId: foundUser.id,
      role:role
    }
    setEmail("");
    setRole("");
    setErrors({});
    dispatch(addMember({idPrj,newEmployee}))
    dispatch(clearActionTask());
  };

  return (
    <div className="fix-container" id="fix-container">
      <div className="fix-add">
        <div className="fix-add-navbar">
          <p id="textFixAdd">Thêm thành viên</p>
          <i
            className="fa-solid fa-xmark x"
            onClick={() => dispatch(clearActionTask())}
          ></i>
        </div>

        <div className="fix-add-body">
          <div className="fix-add-body-child">
            <p>Email</p>
            <input
              className={`child ${errors.email ? "error-input" : ""}`}
              type="email"
              value={email}
              maxLength={50}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email thành viên"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="fix-add-body-child">
            <p>Vai trò</p>
            <input
              className={`child ${errors.role ? "error-input" : ""}`}
              type="text"
              value={role}
              maxLength={30}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Nhập vai trò..."
            />
            {errors.role && <p className="error-text">{errors.role}</p>}
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
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}
