import React from "react";
import { useContent } from "../contexts/ContentContext";

/**
 * Inline click-to-edit text bound to a content path.
 * Normal mode: renders plain text in the given tag.
 * Edit mode (admin): text becomes contentEditable; edits commit on blur.
 */
const EditableText = ({ path, as = "span", className = "", placeholder = "" }) => {
  const { getValue, updateField, editMode } = useContent();
  const value = getValue(path);
  const text = value === undefined || value === null ? "" : String(value);
  const Tag = as;

  if (!editMode) {
    return <Tag className={className}>{text || placeholder}</Tag>;
  }

  return (
    <Tag
      className={`${className} editable-text`}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      data-placeholder={placeholder}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      onBlur={(e) => {
        const next = e.currentTarget.innerText;
        if (next !== text) updateField(path, next);
      }}
    >
      {text}
    </Tag>
  );
};

export default EditableText;
