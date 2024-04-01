import { Editor } from "@tinymce/tinymce-react";

const RichtextEditor = () => {
  return (
    <Editor
      apiKey="a8rvdzd82n5zy0guzt38lsrx1oa4h84y25iwp3a18zhoqic8"
      init={{
        plugins:
          "autolink emoticons image link lists media checklist mediaembed powerpaste",
        menubar: "",
        toolbar:
          "undo redo | bold italic underline strikethrough | link image | bullist indent outdent | emoticons charmap | removeformat",
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        ai_request: (request, respondWith) =>
          respondWith.string(() =>
            Promise.reject("See docs to implement AI Assistant"),
          ),
      }}
      initialValue="Welcome to TinyMCE!"
    />
  );
};
export default RichtextEditor;
