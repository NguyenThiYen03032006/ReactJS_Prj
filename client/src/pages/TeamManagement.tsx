import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Team_Navbar from "../components/team/Team_Navbar";
import Team_Footer from "../components/team/Team_Footer";
import Team_Main from "../components/team/Team_Main";
import Team_ModalDelete from "../components/team/teamModal/Team_ModalDelete";
import Team_ModalAdd from "../components/team/teamModal/Team_ModalAdd";
import Team_ModalFix from "../components/team/teamModal/Team_ModalFix";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store/store";

export default function TeamManagement() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  // Kiểm tra đăng nhập
  useEffect(() => {
    if (!user) {
      navigate("/signinForm");
    }
  }, [user, navigate]);

const action = useSelector((state:RootState) => state.modal.action);

  let modal;
  switch (action) {
    case "addPrj":
      modal = <Team_ModalAdd />;
      break;
    case "fixPrj":
      modal = <Team_ModalFix  />;
      break;
    case "deletePrj":
      modal = <Team_ModalDelete  />;
      break;
    default:
      modal = null;
  }

  return (
    <div>
      <Team_Navbar />
      <Team_Main />
      <Team_Footer />
      {modal}
    </div>
  );
}
