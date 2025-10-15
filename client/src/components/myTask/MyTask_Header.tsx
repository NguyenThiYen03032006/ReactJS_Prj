import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store/store";
import { setMySearch, setSortByMy } from "../../redux/reducers/myTask";

export default function MyTask_Header() {
  const dispatch = useDispatch<AppDispatch>();
  const keyword = useSelector((state: RootState) => state.myTask.search);
  const sortBy = useSelector((state: RootState) => state.listTask.sortBy);
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setMySearch(e.target.value));
  }
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setSortByMy(e.target.value as "choose" | "priority" | "progress"));
    };
  return (
    <div className="head-container">
      <div className="head-left">
        <button>+ Thêm nhiệm vụ</button>
      </div>

      <div className="head-right">
        <div className="head-right-bottom">
          <select className="select" value={sortBy} onChange={handleSortChange}>
            <option value="choose">Sắp xếp theo</option>
            <option value="priority">Ưu tiên</option>
            <option value="progress">Tiến độ</option>
          </select>
          <input
            className="input-text"
            type="text"
            placeholder="Tìm kiếm nhiệm vụ"
            value={keyword}
            onChange={handleSearch}
          />
        </div>
      </div>
    </div>
  );
}
