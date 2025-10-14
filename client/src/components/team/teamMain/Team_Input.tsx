import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../../redux/store/store";
import { setAction, setSearch } from "../../../redux/reducers/modal";

export default function Team_Input() {
  const dispatch = useDispatch<AppDispatch>();
  const keyword = useSelector((state: RootState) => state.modal.search);

  function handleClick() {
    dispatch(setAction("addPrj"));
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSearch(e.target.value));
  }

  return (
    <div className="add-search">
      <button className="add-project" onClick={handleClick}>
        + Thêm Dự Án
      </button>
      <input
        className="search-project"
        type="text"
        placeholder="Tìm kiếm dự án"
        id="searchProject"
        value={keyword}
        onChange={handleSearch} 
      />
    </div>
  );
}
