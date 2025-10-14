
import '../../css/detail.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import Main_Header from './Main_Header';
import Detail_List from './detailMain/Detail_List';
export default function Detail_Main() {
  return (
    <div className="detail-body">
      <div className="container">
        {/* Header */}
        <Main_Header/>
        {/* Body */}
        <Detail_List/>
      </div>
    </div>
  );
}
