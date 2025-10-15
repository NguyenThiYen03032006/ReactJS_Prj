
import Team_Navbar from "../components/team/Team_Navbar";
import Team_Footer from "../components/team/Team_Footer";
import MyTask_Main from "../components/myTask/MyTask_Main";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MyTask() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/signinForm");
    }
  }, [user, navigate]);
  return (
    <div>
      <Team_Navbar />
        <MyTask_Main/>
      <Team_Footer />
    </div>
  );
}
