import "./Form.css";
import UploadImg from "../../Assets/add-image.png";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import upload from '../../Assets/icons/upload.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

let formDefaultValues = {
  name: "",
  description: "",
  image: "",
  startDate: "",
  endDate: "",
  level: "",
};

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editItem = location.state?.editItem; // Get the editItem from location state

  formDefaultValues = editItem
    ? { ...formDefaultValues, ...editItem }
    : formDefaultValues;

  const [formValues, setFormValues] = useState(formDefaultValues);
  const [showImage, setShowImage] = useState(editItem?.image || ''); // Show image if editing
  const [fileName, setFileName] = useState(editItem ? 'Uploaded Image' : ''); // Show filename if editing

  const existingHackathon = JSON.parse(localStorage.getItem("hackathons")) || [];

  const { name, description, image, startDate, endDate, level } = formValues;

  const formOnchangeHandle = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      setFileName(files[0].name);
      const reader = new FileReader();
      const file = files[0];

      reader.onloadend = () => {
        setFormValues({ ...formValues, [name]: reader.result });
        setShowImage(reader.result);
      };

      reader.readAsDataURL(file);
    } else if (name === "startDate" || name === "endDate") {
      const formattedDate = new Date(value).toISOString().substring(0, 10);
      setFormValues({ ...formValues, [name]: formattedDate });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const formOnSubmitHandler = (e) => {
    e.preventDefault();

    let updatedData;

    if (editItem) {
      // Update only the item with the matching name
      updatedData = existingHackathon.map((item) => {
        if (item.name === editItem.name) {
          return { ...item, ...formValues };
        }
        return item;
      });
    } else {
      const newEntry = {
        id: new Date().getTime(),
        ...formValues,
      };
      updatedData = [...existingHackathon, newEntry];
    }

    localStorage.setItem("hackathons", JSON.stringify(updatedData));
    navigate("/");
  };

  return (
    <div className="form__route">
      <form
        className="form__container"
        onSubmit={formOnSubmitHandler}
        method="POST"
        encType="multipart/form-data"
      >
        <h3 className="form__heading">Challenge Details</h3>

        <label className="form__label">Challenge Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={formOnchangeHandle}
          required
        />

        <div className="form__date">
          <label htmlFor="startDateInput" className="form__label">
            Start Date
          </label>
          <input
            className="input__date"
            type="date"
            id="startDateInput"
            name="startDate"
            value={startDate || ""}
            onChange={formOnchangeHandle}
            required
          />
        </div>

        <div className="form__date">
          <label htmlFor="endDateInput" className="form__label">
            End Date
          </label>
          <input
            className="input__date"
            type="date"
            id="endDateInput"
            name="endDate"
            value={endDate || ""}
            onChange={formOnchangeHandle}
            required
          />
        </div>

        <label className="form__label">Description</label>
        <textarea
          className="input__description"
          name="description"
          value={description}
          onChange={formOnchangeHandle}
          required
        ></textarea>

        <label className="form__label">Cover Image</label>
        {showImage ? (
          <label className="form__img--upload uploaded" htmlFor="imageUpload">
            <img
              src={showImage}
              alt="Uploaded"
              className="form__uploaded--img"
            />
            <p className="file-name">{fileName}</p>
            <p className="re-upload__container">
              Reupload <img src={UploadImg} alt="upload"/>
            </p>
          </label>
        ) : (
          <label className="form__img--upload upload" htmlFor="imageUpload">
            <input
              type="file"
              accept="image/*"
              id="imageUpload"
              name="image"
              onChange={formOnchangeHandle}
              required
            />
            <img src={upload} alt="Upload" className="form__upload--img" />
          </label>
        )}

        <label className="form__label">Level Type</label>
        <div className="form__date">
          <select
            name="level"
            value={level}
            className="form-level"
            onChange={formOnchangeHandle}
            required
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="btn__container">
          <button className="form__button" type="submit">
            {editItem ? "Save Challenge" : "Create Challenge"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
