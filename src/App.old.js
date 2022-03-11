import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./App.css";

const App = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <div className="App">
      <header className="App-header">Rich Text Editor Example</header>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          textAlign: {
            inDropdown: true,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["left", "center", "right", "justify"],
            left: { className: undefined },
            center: { className: undefined },
            right: { className: undefined },
            justify: { className: undefined },
          },
        }}
      />
      <div
        className="preview"
        dangerouslySetInnerHTML={createMarkup(convertedContent)}
      ></div>
    </div>
  );
};

export default App;
