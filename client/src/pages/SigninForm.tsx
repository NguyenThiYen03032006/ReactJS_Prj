import React, { useEffect, useState } from "react";
import "../css/base.css";
import "../css/signin.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../redux/store/store";
import { fetchUser, type User } from "../redux/reducers/user";

export default function SigninForm() {
  // server
  const lisrUser = useSelector((state: RootState) => state.listUser);
  const dispatch = useDispatch<AppDispatch>();

  // input
  const [inputSigninEmail, setInputSigninEmail] = useState<string>("");
  const [inputSigninPass, setInputSigninPass] = useState<string>("");

  // error
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [errorForm, setErrorForm] = useState("");
  const [borderEmail, setBorderEmail] = useState(
    "1px solid rgba(228, 228, 231, 1)"
  );
  const [borderPass, setBorderPass] = useState(
    "1px solid rgba(228, 228, 231, 1)"
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // ✅ Hàm kiểm tra email
  function checkEmail(): { isValid: boolean; user?:User } {
    if (!inputSigninEmail) {
      setErrorEmail("Email không được để trống");
      setBorderEmail("1px solid red");
      return { isValid: false };
    }

    const foundUser = lisrUser.lisUser.find(
      (user) => user.email === inputSigninEmail
    );

    if (!foundUser) {
      return { isValid: false };
    }

    // hợp lệ
    setErrorEmail("");
    setBorderEmail("1px solid rgba(228, 228, 231, 1)");
    return { isValid: true, user: foundUser };
  }

  // ✅ Hàm kiểm tra mật khẩu
  function checkPass(user: User): boolean {
    if (!inputSigninPass) {
      setErrorPass("Mật khẩu không được để trống");
      setBorderPass("1px solid red");
      return false;
    }

    if (user.password !== inputSigninPass) {
      return false;
    }

    setErrorPass("");
    setBorderPass("1px solid rgba(228, 228, 231, 1)");
    return true;
  }

  // ✅ Gửi form
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorForm("");

    const { isValid, user } = checkEmail();
    if (!isValid || !user) {
      setErrorForm("Thông tin đăng nhập không hợp lệ");
      return;
    }

    const isPassValid = checkPass(user);
    if (!isPassValid) {
      setErrorForm("Thông tin đăng nhập không hợp lệ");
      return;
    }

    // nếu hợp lệ
    localStorage.setItem("user", JSON.stringify(user.id));
    setInputSigninEmail('')
    setInputSigninPass('')
    navigate("/projects");
  }

  return (
    <div>
      <h1 className="h1">Đăng nhập</h1>
      <form id="form-signin" onSubmit={handleSubmit}>
        <div className="form-signin-child">
          <label htmlFor="email">Email</label>
          <input
            style={{ border: borderEmail }}
            className="input-signin"
            id="input-signin-email"
            type="email"
            name="email"
            placeholder="Địa chỉ email"
            autoComplete="email"
            value={inputSigninEmail}
            onChange={(e) => setInputSigninEmail(e.target.value)}
          />
          <span className="error" id="errorEmail">
            {errorEmail}
          </span>
        </div>

        <div className="form-signin-child">
          <label htmlFor="pass">Mật khẩu</label>
          <input
            style={{ border: borderPass }}
            className="input-signin"
            id="input-signin-password"
            type="password"
            name="pass"
            placeholder="Mật khẩu"
            autoComplete="current-password"
            value={inputSigninPass}
            onChange={(e) => setInputSigninPass(e.target.value)}
          />
          <span className="error" id="errorPassword">
            {errorPass}
          </span>
        </div>

        <div className="form-btn">
          <span className="error" id="errorForm">
            {errorForm}
          </span>
          <button
            className="input-signin"
            id="input-signin-submit"
            type="submit"
          >
            Đăng nhập
          </button>
        </div>

        <p className="p">
          Chưa có tài khoản?{" "}
          <Link to={"/signupForm"} className="text-link">
            <b>Đăng ký</b>
          </Link>
        </p>
      </form>
    </div>
  );
}
