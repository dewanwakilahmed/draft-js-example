import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

import DOMPurify from "dompurify";

import "./App.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const App = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const dirtyHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  console.log(dirtyHTML);

  const cleanHTML = DOMPurify.sanitize(dirtyHTML, {
    USE_PROFILES: { html: true },
  });

  return (
    <div>
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
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
        <br />
        <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
      </div>
    </div>
  );
};

export default App;
