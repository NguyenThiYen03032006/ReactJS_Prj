import MyTask_Header from "./MyTask_Header";
import MyTask_List from "./MyTask_List";
//import MyTask_Modal from "./MyTask_Modal";

export default function MyTask_Main() {
  return (
    <div className="detail-body">
      <div className="container">
        <MyTask_Header />
        <MyTask_List />
      </div>
      {/* <MyTask_Modal/> */}
    </div>
  );
}
