const inputFile = document.getElementById("inputImage");
const uploaded_img = new Image();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const downloadBtn =document.getElementById("downloadBtn");

inputFile.addEventListener("change", (e) => {
  console.log("File selected");
  if (inputFile.files.length > 0) {
    const reader = new FileReader();

    reader.onload = function () {
      uploaded_img.src = reader.result;
      uploaded_img.onload = function () {
        canvas.width = uploaded_img.width;
        canvas.height = uploaded_img.height;
        ctx.drawImage(uploaded_img, 0, 0);
        const imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
        const data = imgData.data;
        ctx.putImageData(imgData,0,0);
        document.getElementById("uploadbtn").style.color = "rgba(255,0,0,0)";
      };
    };

    reader.onerror = function (error) {
      document.getElementById("uploadbtn").style.color = "black";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      console.error("Error reading the file:", error);
    };

    reader.onabort = function () {
      document.getElementById("uploadbtn").style.color = "black";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      console.error("File reading aborted");
    };

    reader.readAsDataURL(inputFile.files[0]);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("uploadbtn").style.color = "black";
    console.log("file is null");
  }
});

convertBtn = document.getElementById("convertBtn");

convertBtn.addEventListener("click", () => {
  const imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
  const data = imgData.data;

  for(let i=0;i<data.length; i+=4){
    const avg = (data[i]+data[i+1]+data[i+2])/3;
    data[i]=avg;
    data[i+1]= avg;
    data[i+2] = avg;
  }
  ctx.putImageData(imgData,0,0);
  downloadBtn.style.display = "block";
});

downloadBtn.addEventListener("click",()=>{
  let url =canvas.toDataURL();
  const a = document.createElement('a');
  a.href=url;
  a.download = "downloaded_image.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
})
