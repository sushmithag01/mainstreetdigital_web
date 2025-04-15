import React from "react";
import { MdMailOutline } from "react-icons/md";

const EmailLink = ({ email, subject, body, className }) => {
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return (
    <a href={mailtoLink} className={className}>
      <MdMailOutline className="nav-icon" /> Email Support
    </a>
  );
};

export default EmailLink;
