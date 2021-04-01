var bucket = new AWS.S3({
  accessKeyId: "",//your keyid
  secretAccessKey: " ",//your skey
  region: 'us-east-2'
});

uploadfile = function (fileName, file) {
  const params = {
    Bucket: "extracttext",
    Key: fileName,
    Body: file,
    ContentType: file.type,
  };
  return this.bucket.upload(params, function (err, data) {
    if (err) {
      console.log("There was an error uploading your file: ", err);
      return false;
    }
    document.getElementById("message").innerHTML = "Successfully uploaded file.";
    viewFiledata(file.name);
    return true;
  });
};
var myFuncCalls = 0;
viewFiledata = function (filename) {
    AWS.config.update({
      accessKeyId: "",//your key
      secretAccessKey: ""//your skey
    });
    var s3 = new AWS.S3();
    var fn = myFuncCalls === 0?filename.split(".")[0]+".txt":filename;
    myFuncCalls++;
    s3.getObject(
      { Bucket: "extracttext", Key: fn },
      function (error, data) {
        if (error != null) {
          document.getElementById("textfile").innerHTML= "TRYING TO FETCH...........";
          myFuncCalls<25 ? setTimeout(function(){viewFiledata(fn) }, 3000) : alert("Couldn't find the text file for the given file");
        } else {
           document.getElementById("textfile").innerHTML= fn +"<br>";
           document.getElementById("textfile").innerHTML+= data.Body;
        }
      }
    );
};
uploadSampleFile = function () {
  var progressDiv = document.getElementById("myProgress");
  progressDiv.style.display = "block";
  var progressBar = document.getElementById("myBar");
  file = document.getElementById("myFile").files[0];
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
};
