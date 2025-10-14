import { setTaskSearch } from "../../redux/reducers/modalTask";
import { setSortBy } from "../../redux/reducers/task";
import type { AppDispatch, RootState } from "../../redux/store/store";
import Employees from "./Employees";
import Head_Title from "./Head_Title";
import { useDispatch, useSelector } from "react-redux";

export default function Main_Header() {
  const dispatch = useDispatch<AppDispatch>();
  const sortBy = useSelector((state: RootState) => state.listTask.sortBy);
  const keyword= useSelector((state:RootState)=>state.modalTask.search)
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value as "choose" | "priority" | "progress"));
  };

function handleSearch(e: React.ChangeEvent<HTMLInputElement>){
  dispatch(setTaskSearch(e.target.value))
}
  return (
    <div className="head-container">
      <div className="head-left">
        <Head_Title />
      </div>

      <div className="head-right">
        <Employees />

        <div className="head-right-bottom">
          <select className="select" value={sortBy} onChange={handleSortChange}>
            <option value="choose">Sắp xếp theo</option>
            <option value="priority">Ưu tiên</option>
            <option value="progress">Tiến độ</option>
          </select>
          <input
            className="input-text"
            type="text"
            value={keyword}
            onChange={handleSearch}
            placeholder="Tìm kiếm nhiệm vụ"
          />
        </div>
      </div>
    </div>
  );
}
