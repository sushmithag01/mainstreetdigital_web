import React, { useState } from "react";
const truncateHTML = (html, limit) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  let charCount = 0;
  let truncated = "";
  const traverseNodes = (node) => {
    if (charCount >= limit) return;
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.slice(0, limit - charCount);
      truncated += text;
      charCount += text.length;
    } else {
      truncated += `<${node.nodeName.toLowerCase()}`;
      Array.from(node.attributes).forEach((attr) => {
        truncated += ` ${attr.name}="${attr.value}"`;
      });
      truncated += ">";
      Array.from(node.childNodes).forEach((childNode) =>
        traverseNodes(childNode)
      );
      if (charCount < limit) {
        truncated += `</${node.nodeName.toLowerCase()}>`;
      }
    }
  };
  traverseNodes(tempDiv);
  return truncated;
};
const stripHTML = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};
const FroalaCustomViewer = ({ content = "", section }) => {
  const [showMore, setShowMore] = useState(false);
  const characterLimit = 280;
  const plainText = stripHTML(content);
  const isLongText = plainText.length > characterLimit;
  const truncatedHTML = isLongText
    ? truncateHTML(content, characterLimit) + "..."
    : content;
  const toggleReadMore = () => setShowMore(!showMore);
  return (
    <div>
      <div
        className="froala-editor fr-view"
        style={{ maxHeight: "none", overflow: "hidden" }}
        dangerouslySetInnerHTML={{
          __html: showMore ? content : truncatedHTML,
        }}
      ></div>
      {isLongText && (
        <button
          onClick={toggleReadMore}
          className="text-blue-500 read-more-link"
        >
          {showMore
            ? `${section == "product" ? `Read Less` : `View Less`}`
            : `${section == "product" ? `Read More` : `View More`}`}
        </button>
      )}
    </div>
  );
};
export default FroalaCustomViewer;
