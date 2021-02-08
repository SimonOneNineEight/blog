import React, { useState } from "react";
import styled from "styled-components";

const Textarea = styled.textarea`
  width: 100%;
  overflow-y: visible;
  resize: none;
  height: 100%;
  color: #e0e0e0;
  background-color: #272727;
  box-sizing: border-box;
  font-size: 18px;
  padding: 10px 10px 0;
`;

export default function TextArea({ placeholder, content, setContent }) {
  const [rows, setRows] = useState(100);
  const minRows = 5;
  const handleChange = (e) => {
    const textareaLineHeight = 24;
    const previousRows = e.target.rows;
    e.target.rows = minRows; // reset number of rows in textarea
    const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);
    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }
    setContent(e.target.value);
    setRows(currentRows);
  };
  return (
    <Textarea
      value={content}
      rows={rows}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}
