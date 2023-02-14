import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";

import styled from "styled-components";
import StyledButton from "../StyledButton";

export default ({
  initialValue,
  onSave,
  buttonTitle = "Save",
}: {
  initialValue: string;
  onSave: (editedVal: string) => void;
  buttonTitle?: string;
}) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        init={{
          height: "60vh",
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",

            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          init_instance_callback: () => {
            const freeTiny = document.querySelector(
              ".tox-notification"
            ) as HTMLElement;
            freeTiny.style.display = "none";
          },
        }}
      />
      <StyledButton
        onClick={() =>
          editorRef.current && onSave(editorRef.current.getContent())
        }
      >
        {buttonTitle}
      </StyledButton>
    </>
  );
};
