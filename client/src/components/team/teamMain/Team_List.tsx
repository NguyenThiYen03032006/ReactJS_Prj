import { useDispatch, useSelector } from "react-redux";
import ProjectItem from "./ProjectItem";
import type { AppDispatch, RootState } from "../../../redux/store/store";
import { fetchProject } from "../../../redux/reducers/project";
import { useEffect } from "react";

export default function Team_List() {
  const dispatch = useDispatch<AppDispatch>();
  const listPrj = useSelector((state: RootState) => state.listProject.listProject);
  const keyword = useSelector((state: RootState) => state.modal.search);
  const currentPage = useSelector((state: RootState) => state.modal.currentPage);
  const itemsPerPage = useSelector((state: RootState) => state.modal.itemsPerPage);

  const idLogin: string = JSON.parse(localStorage.getItem("user") || "");

  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);

  
  const listByUser = listPrj.filter((prj) =>
    prj.members.some((u) => u.userId === idLogin)
  );

  const listFiltered = listByUser.filter((prj) =>
    prj.projectName.toLowerCase().includes(keyword.toLowerCase())
  );


  const totalPages = Math.ceil(listFiltered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const listPaged = listFiltered.slice(startIndex, endIndex);

  // 🔹 Cập nhật tổng số trang để Team_Page sử dụng
  useEffect(() => {
    localStorage.setItem("totalPages", JSON.stringify(totalPages));
  }, [totalPages]);

  return (
    <table className="list-project table">
      <thead>
        <tr>
          <th className="id-project th">STT</th>
          <th className="name-project th">Tên Dự Án</th>
          <th className="th" colSpan={3}>
            Hành động
          </th>
        </tr>
      </thead>
      <tbody id="tbody">
        {listPaged.length > 0 ? (
          listPaged.map((prj, index) => (
            <ProjectItem
              name={prj.projectName}
              id={prj.id}
              key={index}
              number={startIndex + index + 1}
            />
          ))
        ) : (
          <tr>
            <td colSpan={5} style={{ textAlign: "center", color: "#888" }}>
              Không có dự án nào
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
