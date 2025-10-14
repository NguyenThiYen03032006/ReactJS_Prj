import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/base.css";
import "../css/signup.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store/store";
import { fetchUser, type User } from "../redux/reducers/user";

export default function SignupForm() {
  //server
  const lisrUser = useSelector((state: RootState) => state.listUser); // lau du lieu tu api
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // input
  const [inputSignupName, setInputSignupName] = useState<string>("");
  const [inputSignupEmail, setInputSignupEmail] = useState<string>("");
  const [inputSignupPass, setInputSignupPass] = useState<string>("");
  const [inputSignupConfirm, setInputSignupConfirm] = useState<string>("");

  // error state
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");

  // border state
  const [borderName, setBorderName] = useState(
    "1px solid rgba(228, 228, 231, 1)"
  );
  const [borderEmail, setBorderEmail] = useState(
    "1px solid rgba(228, 228, 231, 1)"
  );
  const [borderPass, setBorderPass] = useState(
    "1px solid rgba(228, 228, 231, 1)"
  );
  const [borderConfirm, setBorderConfirm] = useState(
    "1px solid rgba(228, 228, 231, 1)"
  );

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  function checkName(): boolean {
    // validate name
    if (!inputSignupName.trim()) {
      setErrorName("Họ và tên không được để trống");
      setBorderName("1px solid red");
      return false;
    } else {
      setErrorName("");
      setBorderName("1px solid rgba(228, 228, 231, 1)");
      return true;
    }
  }
  // ktra email
  function checkEmail(): boolean {
    // validate email
    if (!inputSignupEmail.trim()) {
      setErrorEmail("Email không được để trống");
      setBorderEmail("1px solid red");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(inputSignupEmail)) {
      // ktra dung dang
      setErrorEmail("Email không hợp lệ");
      setBorderEmail("1px solid red");
      return false;
    } else {
      setErrorEmail("");
      setBorderEmail("1px solid rgba(228, 228, 231, 1)");
      // ktra email ton tai chua
      const isEmailExist = lisrUser.lisUser.find(
        (user) => user.email === inputSignupEmail
      );
      if (isEmailExist) {
        setErrorEmail("Email da duoc dang ky");
        setBorderEmail("1px solid red");
        return false;
      } else {
        return true;
      }
    }
  }

  function checkPass(): boolean {
    // validate password
    if (!inputSignupPass) {
      setErrorPass("Mật khẩu không được để trống");
      setBorderPass("1px solid red");
      return false;
    } else if (inputSignupPass.length < 8) {
      setErrorPass("Mật khẩu phải tối thiểu 8 ký tự");
      setBorderPass("1px solid red");
      return false;
    } else {
      setErrorPass("");
      setBorderPass("1px solid rgba(228, 228, 231, 1)");
      return true;
    }
  }

  function checkConfirm(): boolean {
    // validate confirm password
    if (!inputSignupConfirm) {
      setErrorConfirm("Vui lòng nhập lại mật khẩu");
      setBorderConfirm("1px solid red");
      return false;
    } else if (inputSignupConfirm !== inputSignupPass) {
      setErrorConfirm("Mật khẩu không khớp");
      setBorderConfirm("1px solid red");
      return false;
    } else {
      setErrorConfirm("");
      setBorderConfirm("1px solid rgba(228, 228, 231, 1)");
      return true;
    }
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const isName = checkName();
    const isEmail = checkEmail();
    const isPass = checkPass();
    const isConfirm = checkConfirm();

    if (isConfirm && isEmail && isName && isPass) {
      // tao du lieu moi khi dang ky thanh cong
      const newUser: User={
        id:Date.now().toString(),
        fullName: inputSignupName,
        email:inputSignupEmail,
        password:inputSignupPass
      }
      // xoa input
      setInputSignupName('')
      setInputSignupEmail('')
      setInputSignupPass('')
      setInputSignupConfirm('')

      localStorage.setItem('user',JSON.stringify(newUser))
      navigate("/projects");
    }
  }

  return (
    <div>
      <h1 className="h1">Đăng ký</h1>
      <form id="form-signup" onSubmit={handleSubmit}>
        <div className="form-signup-child">
          <input
            style={{ border: borderName }}
            className="input-signup"
            type="text"
            id="input-signup-name"
            placeholder="Họ và tên"
            value={inputSignupName}
            onChange={(e) => setInputSignupName(e.target.value)}
          />
          <span className="error">{errorName}</span>
        </div>

        <div className="form-signup-child">
          <input
            style={{ border: borderEmail }}
            className="input-signup"
            type="email"
            id="input-signup-email"
            placeholder="Địa chỉ email"
            value={inputSignupEmail}
            onChange={(e) => setInputSignupEmail(e.target.value)}
          />
          <span className="error">{errorEmail}</span>
        </div>

        <div className="form-signup-child">
          <input
            style={{ border: borderPass }}
            className="input-signup"
            type="password"
            id="input-signup-password"
            placeholder="Mật khẩu"
            value={inputSignupPass}
            onChange={(e) => setInputSignupPass(e.target.value)}
          />
          <span className="error">{errorPass}</span>
        </div>

        <div className="form-signup-child">
          <input
            style={{ border: borderConfirm }}
            className="input-signup"
            type="password"
            id="input-signup-confirmPassword"
            placeholder="Xác nhận mật khẩu"
            value={inputSignupConfirm}
            onChange={(e) => setInputSignupConfirm(e.target.value)}
          />
          <span className="error">{errorConfirm}</span>
        </div>

        <button className="input-signup" id="input-signup-submit" type="submit">
          Đăng ký
        </button>

        <p className="p">
          Đã có tài khoản?{" "}
          <Link to="/signinForm" className="text-link">
            <b>Đăng nhập</b>
          </Link>
        </p>
      </form>
    </div>
  );
}
