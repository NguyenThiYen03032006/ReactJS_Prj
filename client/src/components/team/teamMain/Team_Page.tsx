import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../redux/reducers/modal";
import type { AppDispatch, RootState } from "../../../redux/store/store";

export default function Team_Page() {
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector((state: RootState) => state.modal.currentPage);

  // 🔹 Lấy tổng số trang do Team_List lưu vào localStorage
  const totalPages = JSON.parse(localStorage.getItem("totalPages") || "1");

  const handlePrev = () => {
    if (currentPage > 1) dispatch(setCurrentPage(currentPage - 1));
  };

  const handleNext = () => {
    if (currentPage < totalPages) dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePageClick = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="page-container">
      <span className="prev-page" onClick={handlePrev}>
        <i className="fa-solid fa-chevron-left"></i>
      </span>

      <div className="page" id="page">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <span
            key={page}
            id={page === currentPage ? "choose-page" : ""}
            onClick={() => handlePageClick(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </span>
        ))}
      </div>

      <span className="next-page" onClick={handleNext}>
        <i className="fa-solid fa-chevron-right"></i>
      </span>
    </div>
  );
}
