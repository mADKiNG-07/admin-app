import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import "./filesDragAndDrop.css";

import { ImageConfig } from "../../config/ImageConfig";

const FilesDragAndDrop = (props) => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  var data = [];
  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    // if (newFile) {
    //   const updatedList = [...fileList, newFile];
    //   data = updatedList;
    //   setFileList(updatedList);
    //   props.onFileChange(updatedList);
    //   // onFileChange(newFile);
    // }
    if (newFile) {
      setFileList([newFile]); // Set fileList as an array with the new file
      props.onFileChange(newFile); // Notify the parent component about the new file
    }
  };

  // const fileRemove = (file) => {
  //   const updatedList = [...fileList];
  //   updatedList.splice(fileList.indexOf(file), 1);
  //   setFileList(updatedList);
  //   props.onFileChange(updatedList);
  //   props.submitData(updatedList);
  // };

  const fileRemove = () => {
    if (fileList.length === 1) {
      setFileList([]); // Set fileList to an empty array since there is no file
      props.onFileChange(null); // Notify the parent component that there is no file
      props.submitData(null); // Submit data with no file
    }
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <img src={props.icon} alt="" />
          <p className="lead">{props.text}</p>
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>
      {fileList.length > 0 ? (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Ready to upload</p>
          {fileList.map((item, index) => (
            <div key={index} className="drop-file-preview__item">
              <img
                src={
                  ImageConfig[item.type.split("/")[1]] || ImageConfig["default"]
                }
                width={75}
                alt=""
              />
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
                <p>{item.size}B</p>
              </div>
              <span
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              >
                x
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

FilesDragAndDrop.propTypes = {
  onFileChange: PropTypes.func,
  submitData: PropTypes.func,
};

export default FilesDragAndDrop;
