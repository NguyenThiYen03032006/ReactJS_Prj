import Team_Navbar from "../components/team/Team_Navbar";
import Team_Footer from "../components/team/Team_Footer";
import MyTask_Main from "../components/myTask/MyTask_Main";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MyTask_Modal from "../components/myTask/MyTask_Modal";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store/store";

export default function MyTask() {
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
    case "myTask":
      modalTask = <MyTask_Modal />;
      break;
    default:
      modalTask = null;
  }
  return (
    <div>
      <Team_Navbar />
      <MyTask_Main />
      <Team_Footer />
      {modalTask}
    </div>
  );
}
