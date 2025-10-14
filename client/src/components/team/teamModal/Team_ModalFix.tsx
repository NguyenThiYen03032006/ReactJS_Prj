import { useDispatch, useSelector } from "react-redux";
import { clearAction } from "../../../redux/reducers/modal";
import type { AppDispatch, RootState } from "../../../redux/store/store";
import { useEffect, useState, type ChangeEvent } from "react";
import axios from "axios";
import { fixProject } from "../../../redux/reducers/project";
import type { Project } from "../../../redux/reducers/project";

export default function Team_ModalFix() {
  const dispatch = useDispatch<AppDispatch>();

  // Lấy id project cần sửa
  const idFix = useSelector((state: RootState) => state.modal.projectIdToFix);

  // Danh sách tất cả project
  const listAllPrj = useSelector(
    (state: RootState) => state.listProject.listProject
  );

  // Lọc ra project cần sửa
  const prjFix = listAllPrj.find((prj) => prj.id === idFix);

  // State input
  const [inputName, setInputName] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [img, setImg] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Gán dữ liệu ban đầu vào input
  useEffect(() => {
    if (prjFix) {
      setInputName(prjFix.projectName || "");
      setInputDescription(prjFix.description || "");
      setImg(prjFix.image || "");
    }
  }, [prjFix]);

  // Khi chọn file => tạo link preview
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImg(event.target?.result as string); // hiển thị preview
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Validate
  function validateForm(): boolean {
    if (!inputName.trim()) {
      setError("Vui lòng nhập tên dự án");
      return false;
    }
    if (!inputDescription.trim()) {
      setError("Vui lòng nhập mô tả dự án");
      return false;
    }
    if (inputName.trim().length < 3 || inputName.trim().length > 50) {
      setError("Tên dự án phải từ 3 đến 50 ký tự");
      return false;
    }
    if (
      inputDescription.trim().length < 10 ||
      inputDescription.trim().length > 300
    ) {
      setError("Mô tả dự án phải từ 10 đến 300 ký tự");
      return false;
    }
    return true;
  }

  // Sửa project
  async function handleFix() {
    setError("");
    if (!validateForm()) return;

    if (!prjFix) {
      setError("Không tìm thấy dự án cần sửa!");
      return;
    }

    setLoading(true);

    try {
      let imgUrl = prjFix.image; // giữ ảnh cũ nếu không upload ảnh mới

      // Nếu có file mới thì upload Cloudinary
      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "demo_01");

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dtzbq5t0k/image/upload",
          data
        );
        imgUrl = res.data.secure_url;
      }

      // Tạo object sửa
      const updatedProject: Project = {
        ...prjFix,
        projectName: inputName.trim(),
        description: inputDescription.trim(),
        image: imgUrl,
      };

      // Gửi request PUT qua Redux
      await dispatch(fixProject(updatedProject));

      // Đóng modal
      dispatch(clearAction());
    } catch (err) {
      console.error(err);
      setError("Đã xảy ra lỗi khi cập nhật dự án!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fix-container" id="fix-container">
      <div className="fix-add">
        {/* Navbar */}
        <div className="fix-add-navbar">
          <h3>Sửa dự án</h3>
          <i
            className="fa-solid fa-xmark x exit"
            onClick={() => dispatch(clearAction())}
          ></i>
        </div>

        {/* Body */}
        <div className="fix-add-body">
          {/* Tên dự án */}
          <div className="fix-add-body-child">
            <label htmlFor="input-add-project">Tên dự án</label>
            <input
              id="input-add-project"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
          </div>

          {/* Ảnh */}
          <div className="fix-add-body-child">
            <label>Hình ảnh dự án</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="img-input"
            />
            <img src={img} alt="" />
          </div>

          {/* Mô tả */}
          <div className="fix-add-body-child">
            <label htmlFor="text-describe-project">Mô tả dự án</label>
            <textarea
              id="text-describe-project"
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
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
          <button className="btn-cancel" onClick={() => dispatch(clearAction())}>
            Huỷ
          </button>
          <button className="btn-save" onClick={handleFix} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>
    </div>
  );
}
