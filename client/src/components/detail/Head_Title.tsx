import type { AppDispatch, RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchTask } from "../../redux/reducers/task";
import { useEffect, useState } from "react";
import { fetchProject } from "../../redux/reducers/project";
import { setActionTask } from "../../redux/reducers/modalTask";
export default function Head_Title() {
  // lay du lieu
  const idPrj: string | null = JSON.parse(
    localStorage.getItem("idDetail") || "null"
  );
  
  const dispatch = useDispatch<AppDispatch>();
  const allPrj = useSelector(
    (state: RootState) => state.listProject.listProject
  );
  const prj = allPrj.find((p) => p.id == idPrj);
  // hien thi
  const [title, setTitle] = useState("");
  const [descripton, setDescription] = useState("");
  const [imgURL, setImgURL] = useState("");

  useEffect(() => {
    dispatch(fetchTask());
    dispatch(fetchProject())
  }, [dispatch]);
  useEffect(() => {
    setTitle(prj?.projectName || "");
    setImgURL(prj?.image || "");
    setDescription(prj?.description || "");
  }, [prj]);

  function handleClick(){
    dispatch(setActionTask('addTask'))
  }
  return (
    <>
      <h3 id="name-task">{title}</h3>
      <div className="head-left-main">
        <img src={imgURL||undefined} alt="" />
        <p className="head" id="taskDescribe">
          {descripton}
        </p>
      </div>

      <button onClick={handleClick}>+ Thêm nhiệm vụ</button>
    </>
  );
}
