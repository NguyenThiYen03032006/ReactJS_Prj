
import Team_Navbar from "../components/team/Team_Navbar";
import Team_Footer from "../components/team/Team_Footer";
import MyTask_Main from "../components/myTask/MyTask_Main";

export default function MyTask() {
  return (
    <div>
      <Team_Navbar />
        <MyTask_Main/>
      <Team_Footer />
    </div>
  );
}
