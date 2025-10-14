import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store/store";
import { clearAction } from "../../../redux/reducers/modal";
import { useState, type ChangeEvent } from "react";
import { addProject, type Project } from "../../../redux/reducers/project";
import axios from "axios";

export default function Team_ModalAdd() {
  const [file, setFile] = useState<File | null>(null);
  const [, setImg] = useState("");
  const [inputName, setInputName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  // Lấy id user đăng nhập
  const idOwner = JSON.parse(localStorage.getItem("user") || "0");
  // lay danh sach prj
  const listAllPrj = useSelector(
    (state: RootState) => state.listProject.listProject
  );
  // lay ra listPrj cua owner tuong ung
  const list = listAllPrj.filter((prj) =>
    prj.members.some((u) => u.userId === idOwner)
  );

  // validate
  function validateForm(): boolean {
    //ktra trong
    if (!inputName.trim()) {
      setError("Vui lòng nhập tên dự án");
      return false;
    }
    if (!description.trim()) {
      setError("Vui lòng nhập mô tả dự án");
      return false;
    }
    if (!file) {
      setError("Vui lòng chọn hình ảnh dự án");
      return false;
    }
    //ten 3-50 ky tu, mo ta 10-300 ky tu
    if (inputName.trim().length < 3 || inputName.trim().length > 50) {
      setError("Tên dự án phải từ 3 đến 50 ký tự");
      return false;
    }
    if (description.trim().length < 10 || description.trim().length > 300) {
      setError("Mô tả dự án phải từ 10 đến 300 ký tự");
      return false;
    }
    // trung ten du an
    const isDuplicate = list.some(
      (prj) =>
        prj.projectName.trim().toLowerCase() === inputName.trim().toLowerCase()
    );
    if (isDuplicate) {
      setError("Tên dự án này đã tồn tại.");
      return false;
    }

    return true;
  }
  // chọn file
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }
  // ADDS
  async function handleAdd() {
    setError("");

    // kiểm tra form trước
    if (!validateForm()) return;

    setLoading(true);

    try {
      // upload ảnh
      const data = new FormData();
      data.append("file", file as Blob);
      data.append("upload_preset", "demo_01");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dtzbq5t0k/image/upload",
        data
      );

      const imgUrl = res.data.secure_url;
      setImg(imgUrl);

      // tạo project mới
      const newProject: Project = {
        id: Date.now().toString(),
        projectName: inputName.trim(),
        description: description.trim(),
        image: imgUrl,
        members: [
          {
            userId: idOwner,
            role: "Project owner",
          },
        ],
      };

      // lưu vào redux
      dispatch(addProject(newProject));
      // đóng modal
      dispatch(clearAction());
      // reset input
      setInputName("");
      setDescription("");
      setFile(null);
    } catch (err) {
      console.error(err);
      setError("Đã xảy ra lỗi khi tải ảnh hoặc lưu dự án!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fix-container" id="fix-container">
      <div className="fix-add">
        {/* Navbar */}
        <div className="fix-add-navbar">
          <h3>Thêm dự án</h3>
          <i
            className="fa-solid fa-xmark x exit"
            onClick={() => dispatch(clearAction())}
          ></i>
        </div>

        {/* Body */}
        <div className="fix-add-body">
          <div className="fix-add-body-child">
            <label htmlFor="input-add-project">Tên dự án</label>
            <input
              id="input-add-project"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Nhập tên dự án..."
              maxLength={50}
            />
          </div>

          <div className="fix-add-body-child">
            <label>Hình ảnh dự án</label>
            <input
              type="file"
              className="img-input"
              onChange={handleChange}
              accept="image/*"
            />
          </div>

          <div className="fix-add-body-child">
            <label htmlFor="text-describe-project">Mô tả dự án</label>
            <textarea
              id="text-describe-project"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả ngắn gọn..."
              maxLength={300}
            ></textarea>
          </div>

          {error && (
            <p className="error" style={{ color: "red", fontSize: "13px" }}>
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="fix-add-footer">
          <button
            className="btn-cancel"
            onClick={() => dispatch(clearAction())}
            disabled={loading}
          >
            Huỷ
          </button>
          <button className="btn-save" onClick={handleAdd} disabled={loading}>
            {loading ? "Đang thêm..." : "Thêm"}
          </button>
        </div>
      </div>
    </div>
  );
}
