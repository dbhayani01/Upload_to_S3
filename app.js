var bucket = new AWS.S3({
    accessKeyId: "ACCESS_key", //private
    secretAccessKey: "Secret_key", //private
    region: 'us-east-2' //your zone
  });
 
  uploadfile = function(fileName, file) {
    const params = {
      Bucket: "extracttext",
      Key: fileName,
      Body: file,
      ContentType: file.type
    };
    return this.bucket.upload(params, function(err, data) {
 
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      document.getElementById("textfile").innerHTML = data;

      // bucket.getObject(
      //   { Bucket: Bucket, Key: `${file.name.split(".")}.txt` },
      //   function (error, data) {
      //     if (error != null) {
      //       alert("Failed to retrieve an object: " + error);
      //     } else {
      //       alert("Loaded " + data.ContentLength + " bytes");
      //       // do something with data.Body
      //     }
      //   }
      // );

      return true;
    });
  }
 
  uploadSampleFile = function() {
    var progressDiv = document.getElementById("myProgress");
    progressDiv.style.display="block";
    var progressBar = document.getElementById("myBar");
    file = document.getElementById("myFile").files[0];
    uniqueFileName = file.name; 
    let fileUpload = {
      id: "",
      name: file.name,
      nameUpload: uniqueFileName,
      size: file.size,
      type: "",
      timeReference: 'Unknown',
      progressStatus: 0,
      displayName: file.name,
      status: 'Uploading..',
    }
    uploadfile(uniqueFileName, file)
      .on('httpUploadProgress', function(progress) {
        let progressPercentage = Math.round(progress.loaded / progress.total * 100);
        console.log(progressPercentage);
        progressBar.style.width = progressPercentage + "%";
        if (progressPercentage < 100) {
          fileUpload.progressStatus = progressPercentage;
 
        } else if (progressPercentage == 100) { 
          fileUpload.progressStatus = progressPercentage;
          fileUpload.status = "Uploaded";
        }
      })
  }