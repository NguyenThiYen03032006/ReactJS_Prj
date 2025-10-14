import Team_Navbar from "../components/team/Team_Navbar";
import Team_Footer from "../components/team/Team_Footer";
import Detail_Main from "../components/detail/Detail_Main";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store/store";
import Detail_ModalDelete from "../components/detail/detailModal/Detail_ModalDelete";
import Detail_ModalFix from "../components/detail/detailModal/Detail_ModalFix";
import Detail_ModalAdd from "../components/detail/detailModal/Detail_ModalAdd";
import List_Employees from "../components/detail/detailMain/detailList/List_Employees";
import Detail_AddMember from "../components/detail/detailModal/Detail_AddMember";

export default function Detail() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/signinForm");
    }
  }, [user, navigate]);
  const action = useSelector((state: RootState) => state.modalTask.action);

  let modalTask;
  switch (action) {
    case "addTask":
      modalTask = <Detail_ModalAdd />;
      break;
    case "fixTask":
      modalTask = <Detail_ModalFix />;
      break;
    case "deleteTask":
      modalTask = <Detail_ModalDelete />;
      break;
    case "employeeTask":
      modalTask = <List_Employees />;
      break;
    case 'addEmployee':
      modalTask=<Detail_AddMember/>;
      break;
    default:
      modalTask = null;
  }
  return (
    <div>
      <Team_Navbar />
      <Detail_Main />
      <Team_Footer />
      {modalTask}
      
    </div>
  );
}
