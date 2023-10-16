/*
 * @Date: 2021-07-13 14:07:50
 * @LastEditors: yehanyang 1958944515@qq.com
 * @LastEditTime: 2023-06-28 11:01:34
 * @FilePath: /Let'talk/Users/mac/Documents/vscode/Robot_front/upload/script.js
 * @Description: 
 */
const form = document.querySelector("form"),
fileInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area");


// file upload function
function uploadFile(name){
  var data = new FormData();
  data.append("multipartFile", fileInput.files[0], name);
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.responseType= 'json';
  xhr.open("POST", "http://127.0.0.1:8080/files/uploadFile");
  xhr.send(data);
  xhr.onreadystatechange = function(){
    console.log("xhr", xhr)
    if(xhr.readyState == 4){
        if(xhr.status>= 200 && xhr.status<300)
        {
          if(xhr.response.state === "200")
          {
            alert("Successfully upload file")
            // storeAvatar(xhr.response.url)
            localStorage.setItem("avatar", xhr.response.url)
            console.log(localStorage.getItem("avatar"))
            storeAvatar()
          }
        }
    }
  }
}

//新的请求存储头像
function storeAvatar()
{
  var Time = new Object;
  Time.url = localStorage.getItem("avatar");
  console.log("Time.url", Time.url)
  Time.userid = localStorage.getItem("userid")
  Time.xxx = 'test'
  //console.log(Time.url)
  let Time_string = JSON.stringify(Time);
  console.log("Time_string", Time_string)

  const xhr  = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.open("POST","http://127.0.0.1:8080/Edit/updateAvatar",true);
  xhr.setRequestHeader('content-Type','application/json');
  xhr.send(Time_string);
  xhr.onreadystatechange = function(){
    console.log("xhr", xhr)
    if(xhr.readyState == 4){
        if(xhr.status>= 200 && xhr.status<300)
        {
           if(xhr.response === "true")
           {
             alert("Successfully insert database")
           }
        }
    }
}
}
  



fileInput.onchange = ({target})=>{
  let file = target.files[0]; //getting file [0] this means if user has selected multiple files then get first one only
  if(file){
    let fileName = file.name; //getting file name
    if(fileName.length >= 12){ //if file name length is greater than 12 then split it and add ...
      let splitName = fileName.split('.');
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    //嵌套调用,uploadFIle()用来获取返回url
    //storeAvatar用来插入数据库
    uploadFile(fileName);
  }
}


// form click event
form.addEventListener("click", () =>{
  fileInput.click();
});
