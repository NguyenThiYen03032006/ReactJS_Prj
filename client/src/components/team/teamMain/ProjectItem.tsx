
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store/store";
import { setAction, setProjectIdToDelete, setProjectIdToFix } from "../../../redux/reducers/modal";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  name: string;
  number: number;
}
export default function ProjectItem({id, name, number }: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate= useNavigate()
  function handleClickFix() {
    dispatch(setProjectIdToFix(id))// luu id prj can sua
    dispatch(setAction("fixPrj"));// mo modal sua
  }
  function handleClickDelete(){
    dispatch(setProjectIdToDelete(id));// luu id prj can xoa
    dispatch(setAction('deletePrj'))// mo modal xoa
  }

  function handleDetail(){
    navigate('/detail')
    localStorage.setItem("idDetail", JSON.stringify(id));

  }
  return (
    <>
      <tr>
        <td className="id-project td">{number}</td>
        <td className="name-project td">{name}</td>
        <td className="td">
          <button className="btn btn-fix" onClick={handleClickFix}>
            Sua
          </button>
        </td>
        <td className="td">
          <button className="btn btn-delete" onClick={handleClickDelete}>Xoa</button>
        </td>
        <td className="td">
          <button className="btn btn-detail" onClick={handleDetail}>Chi tiet</button>
        </td>
      </tr>
    </>
  );
}
