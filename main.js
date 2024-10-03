$(document).ready(function () {
  const converter = new showdown.Converter();

  loadSavedNotes();

  $("#editor").on("input", function () {
    const markdownContent = $(this).val();
    const htmlContent = converter.makeHtml(markdownContent);
    $("#preview").html(htmlContent);
  });

  $("#editor").on("blur", function () {
    saveNotes();
  });

  $("#editor").on("keydown", function (e) {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = this.selectionStart;
      const end = this.selectionEnd;

      $(this).val(
        $(this).val().substring(0, start) +
          "    " +
          $(this).val().substring(end)
      );

      this.selectionStart = this.selectionEnd = start + 4;

      $(this).trigger("input");
    } else if (e.key === "s" && e.ctrlKey) {
      e.preventDefault();
      saveNotes();
      console.log("Document saved");
    }
  });

  function loadSavedNotes() {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      $("#editor").val(savedNotes);
      $("#preview").html(converter.makeHtml(savedNotes));
    }
  }

  function saveNotes() {
    const notes = $("#editor").val();
    localStorage.setItem("notes", notes);
  }
});
