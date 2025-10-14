
import '../../css/team.css'
import '../../css/base.css'
import Team_List from './teamMain/Team_List'
import Team_Page from './teamMain/Team_Page'
import Team_Input from './teamMain/Team_Input'
export default function Team_Main() {
  return (
    <div className="management-body ">
        <div className="container-team">
            <div className="title">
                <h3>Quản Lý Dự Án Nhóm</h3>
            </div>
            <Team_Input/>
            <div className="list">
                <h3>Danh Sách Dự Án</h3>
                <Team_List/>
            </div>
        </div>
        <Team_Page/>
    </div>
  )
}
