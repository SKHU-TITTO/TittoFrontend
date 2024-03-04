import { ref } from "firebase/storage";
import { useMemo } from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";

type QuilEditorProps = {
  quillRef: React.MutableRefObject<ReactQuill | null>;
  htmlContent: string;
  setHtmlContent: React.Dispatch<React.SetStateAction<string>>;
};

const Wrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  text-align: left;
`;

const imageHandler = () => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    try {
      //여기에 firesotorage에 이미지 업로드 하는 코드 작성
      // const strageRef = ref()
    } catch (error) {
      console.log(error);
    }
  });
};

const QuilllEditor = ({
  quillRef,
  htmlContent,
  setHtmlContent,
}: QuilEditorProps) => {
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const editor = quillRef.current?.getEditor();
      const file = input.files?.[0];
      try {
      } catch (error) {
        console.log(error);
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["image"],
          [{ header: [1, 2, 3, 4, 5, false] }],
          ["bold", "underline"],
        ],
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
