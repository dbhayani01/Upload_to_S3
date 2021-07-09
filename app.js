var bucket = new AWS.S3({
  accessKeyId: "",
  secretAccessKey: "",
  region: "",
});

uploadfile = function (fileName, file) {
  const params = {
    Bucket: "",
    Key: fileName,
    Body: file,
    ContentType: file.type,
  };
  return this.bucket.upload(params, function (err, data) {
    if (err) {
      console.log("There was an error uploading your file: ", err);
      return false;
    }
    document.getElementById("message").innerHTML =
      "Successfully uploaded file.";
    viewFiledata(file.name);
    return true;
  });
};

var myFuncCalls = 0;
viewFiledata = function (filename) {
  AWS.config.update({
    accessKeyId: "",
    secretAccessKey: "",
  });
  var s3 = new AWS.S3();
  var fn = myFuncCalls === 0 ? filename.split(".")[0] + ".txt" : filename;
  myFuncCalls++;
  s3.getObject({ Bucket: "", Key: fn }, function (error, data) {
    if (error != null) {
      document.getElementById("textfile").innerHTML =
        "TRYING TO FETCH...........";
     if(myFuncCalls<21)
     {
      setTimeout(function () {viewFiledata(fn);}, 3000)
     }
     else{
      alert("Couldn't find the text file for the given file");
      document.getElementById("textfile").innerHTML = "FAILED TO FETCH";
      window.location.reload();
     }
    } else {
      document.getElementById("textfile").innerHTML = fn + "<br>";
      document.getElementById("textfile").innerHTML += data.Body;
    }
  });
};

uploadSampleFile = function () {
  var progressDiv = document.getElementById("myProgress");
  progressDiv.style.display = "block";
  var progressBar = document.getElementById("myBar");
  file = document.getElementById("myFile").files[0];

  var fname =file.name;
  var re = /(\.jpg|\.jpeg|\.pdf|\.png)$/i;
  if (!re.exec(fname)) {
    alert("File extension not supported!");
    window.location.reload();
  }
  else {
    uniqueFileName = file.name;
    let fileUpload = {
      id: "",
      name: file.name,
      nameUpload: uniqueFileName,
      size: file.size,
      type: "",
      timeReference: "Unknown",
      progressStatus: 0,
      displayName: file.name,
      status: "Uploading..",
    };
    uploadfile(uniqueFileName, file).on(
      "httpUploadProgress",
      function (progress) {
        let progressPercentage = Math.round(
          (progress.loaded / progress.total) * 100
        );
        console.log(progressPercentage);
        progressBar.style.width = progressPercentage + "%";
        if (progressPercentage < 100) {
          fileUpload.progressStatus = progressPercentage;
        } else if (progressPercentage == 100) {
          fileUpload.progressStatus = progressPercentage;
          fileUpload.status = "Uploaded";
        }
      }
    );
  }
};
