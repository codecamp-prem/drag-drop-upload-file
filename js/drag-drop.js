let filesDone = 0;
let filesToDo = 0;
let uploadProgress = [];
let progressBar = document.getElementById('progress-bar');
let dropArea =  document.getElementById('drop-area');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefault, false)
});

function preventDefault(e){
  e.preventDefault();
  e.stopPropagation();
}
//add and remove that highlight class when necessary.
['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight(e){
  dropArea.classList.add('highlight');
}

function unhighlight(e){
  dropArea.classList.remove('highlight');
}

//figure out what to do when some files are dropped:
dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e){
  let dt = e.dataTransfer;
  let files = dt.files;

  handleFiles(files);
}

//Keep in mind that files is not an array, but a FileList. So, when we implement handleFiles,
// we’ll need to convert it to an array in order to iterate over it more easily:

function handleFiles(files){
  files = [...files];
  initializeProgress(files.length);
  files.forEach(uploadFile);
  files.forEach(previewFile);
}

/*
function uploadFile(file){
  let url = 'your URL Here';
  let formData = new FormData(); //FormData, a built-in browser API for creating form data to send to the server.

  formData.append('file', file);

  // fetch API to actually send the image to the server.
  fetch(url, {
    method:'POST',
    body:formData
  })
  .then(
    //() => {/*Done: inform the user*///}
  /*  progressDone
  )
  .catch(
    () => {
      // Error: Inform the User
  });
}
*/

// IE Support
function uploadFile(file, i) { // <- Add `i` parameter
  var url = 'file-upload.php';
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  xhr.open('POST', url, true);

  // Add following event listener
  xhr.upload.addEventListener("progress", function(e) {
    updateProgress(i, (e.loaded * 100.0 / e.total) || 100);
  })

  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Done. Inform the user
      progressDone;
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  })

  formData.append('file', file);
  xhr.send(formData);
}


/*
//The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers)
//stored on the user's computer,
//using File or Blob objects to specify the file or data to read.
*/
function previewFile(file){
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function(){
    let img = document.createElement('img');
    img.src = reader.result;
    document.getElementById('gallery').appendChild(img);
  }
}

function initializeProgress(numFiles) {
  progressBar.value = 0;
  uploadProgress = [];

  for(let i = numFiles; i > 0; i--) {
    uploadProgress.push(0);
  }
}

function updateProgress(fileNumber, percent) {
  uploadProgress[fileNumber] = percent;
  let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length;
  progressBar.value = total;
}

function progressDone() {
  filesDone++;
  progressBar.value = filesDone / filesToDo * 100;
}
