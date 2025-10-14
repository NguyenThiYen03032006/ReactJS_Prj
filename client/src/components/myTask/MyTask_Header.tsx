

export default function MyTask_Header() {


  return (
    <div className="head-container">
      <div className="head-left">
        <button >+ Thêm nhiệm vụ</button>
      </div>

      <div className="head-right">
        

        <div className="head-right-bottom">
          <select className="select" >
            <option value="choose">Sắp xếp theo</option>
            <option value="priority">Ưu tiên</option>
            <option value="progress">Tiến độ</option>
          </select>
          <input
            className="input-text"
            type="text"
            placeholder="Tìm kiếm nhiệm vụ"
          />
        </div>
      </div>
    </div>
  );
}
