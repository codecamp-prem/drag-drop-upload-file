<!DOCTYPE html>
<html>
<head>
 <title>Drag and Drop - with - Progress Bar</title>
 <link href="css/style.css"></link>
</head>
<body>
<div id="drop-area">
  <form class="my-form">
    <p>Upload multiple files with the file dialog or by dragging and dropping images onto the dashed region</p>
    <input type="file" id="fileElem" multiple accept="image/*" onchange="handleFiles(this.files)">
    <label class="button" for="fileElem">Select some files</label>
  </form>
  <progress id="progress-bar" max=100 value=0></progress>
  <div id="gallery"></div>
</div>
<script src="js/drag-drop.js"></script>
</body>
</html>
