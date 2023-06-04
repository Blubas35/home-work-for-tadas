import React from "react";
import "./Style/PageTitle.css";

const PageTitle = ({ title, subTitle }) => {
  return (
    <div className="title-wrapper">
      <h1 className="main-title">{title}</h1>
      <h2 className="sub-title">{subTitle}</h2>
    </div>
  );
};

export default PageTitle;
