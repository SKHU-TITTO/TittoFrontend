import { useMemo } from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";

type QuilEditorProps = {
  quillRef: React.MutableRefObject<ReactQuill | null>;
  htmlContent: string;
  setHtmlContent: React.Dispatch<React.SetStateAction<string>>;
};

const QuilllEditor = ({
  quillRef,
  htmlContent,
  setHtmlContent,
}: QuilEditorProps) => {
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [["image"]],
      },
    };
  }, []);
  return (
    <Wrapper>
      <ReactQuill
        ref={quillRef}
        value={htmlContent}
        onChange={setHtmlContent}
        style={{ paddingTop: "20px", height: "600px" }}
        modules={modules}
      />
    </Wrapper>
  );
};

export default QuilllEditor;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  text-align: left;
`;
