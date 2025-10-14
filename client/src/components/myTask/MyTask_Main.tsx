import React from "react";
import MyTask_Header from "./MyTask_Header";
import MyTask_List from "./MyTask_List";

export default function MyTask_Main() {
  return (
    <div className="detail-body">
      <div className="container">
        <MyTask_Header />
        <MyTask_List />
      </div>
    </div>
  );
}
