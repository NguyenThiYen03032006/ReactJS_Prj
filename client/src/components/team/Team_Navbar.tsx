
import { useNavigate } from "react-router-dom";
import "../../css/base.css";

export default function Team_Navbar() {
  const navigate= useNavigate()
  function handleClick(){
    localStorage.removeItem('user')
    navigate('/signinForm')
  }
  function handleOut(){
    navigate('/projects')
  }
  return (
    <div className="management-navbar navbar">
       <p className="navbar-left"> Quản Lý Dự Án</p>
        <div className="navbar-right">
            <span onClick={handleOut} >Dự Án</span>
            <span>Nhiệm Vụ Của Tôi</span>
            <span id="logout" onClick={handleClick}>Đăng Xuất</span>
        </div>
    </div>
  )
}
