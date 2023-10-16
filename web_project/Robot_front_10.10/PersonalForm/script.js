/*
 * @Date: 2021-06-18 15:16:24
 * @LastEditors: yehanyang 1958944515@qq.com
 * @LastEditTime: 2023-06-28 01:07:34
 * @FilePath: /Let'talk/Users/mac/Documents/vscode/Robot_front/PersonalForm/script.js
 * @Description: 
 */
const form = document.querySelector("form"),
statusTxt = form.querySelector(".button-area span");
const input = document.querySelectorAll("input")
const textarea = document.querySelector("textarea")
const btn= document.querySelector("button");



btn.addEventListener('click',()=>{
  statusTxt.style.color = "#0D6EFD";
  statusTxt.style.display = "block";
  statusTxt.innerText = "Sending your message...";
  form.classList.add("disabled");

  var user = new Object;
  user.userid = localStorage.getItem("userid");
  input[0].value!="" ? user.username = input[0].value : user.username = null;
  //验证mail是否合法
  if(input[1].value!=""){
    if(validEmail(input[1].value)){
      user.mail = input[1].value;
   }else{
       user.mail = null;
       alert("Your mail is invalid!")
       return null;
   }
  }else{
    user.mail = null;
  }
  input[2].value!="" ? user.phone = input[2].value : user.phone = null;
  textarea.value!="" ? user.message = textarea.value : user.message = null;
  
  const xhr  = new XMLHttpRequest();
  let josnUser_string = JSON.stringify(user);
  xhr.open("POST","http://localhost:8080/Edit/EditPersonMessage",true);
  xhr.setRequestHeader('content-Type','application/json');
  xhr.send(josnUser_string);
  xhr.onreadystatechange = function(){
     if(xhr.readyState == 4){
         if(xhr.status>= 200 && xhr.status<300)
         {
             if(xhr.response === "true"){
             alert("Personal information refreshed!");
             statusTxt.innerText = "Successfully edited!";
             }else if(xhr.response === "false")
             {
              alert("Failed to edit, please try again later!")
              statusTxt.innerText = "ReSend Later ......";
             }
             else{
              alert("Please connect to the manager~")
              statusTxt.innerText = "ReSend Later ......";
             }
             window.location.reload();
         }
     }
 }
})


//正则表达式验证邮箱有效性函数,返回值为ture or false
function validEmail(email)
{
   var rep = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
   return rep.test(email);
}


window.onload = function(){
  var Time = new Object;
  Time.state = "202";
  Time.userid = localStorage.getItem("userid");
  
  //创建一个与后端的通话xhr
  const xhr  = new XMLHttpRequest();
  let josnTime_string = JSON.stringify(Time);
  xhr.responseType= 'json';
  xhr.open("POST","http://localhost:8080/MessageShow/getMessage",true);
  xhr.setRequestHeader('content-Type','application/json');
  xhr.send(josnTime_string);
  xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
          if(xhr.status >= 200 && xhr.status<300)
          {
              if(xhr.response!=null)
              {
                let user = xhr.response
                console.log(xhr.response)
                input[0].value=  user.username;
                input[2].value = user.phone;
                input[1].value = user.mail;
                input[3].value = localStorage.getItem("robotid");
                textarea.value = user.message;
              }else{
                alert("Failed to get information, please try again later!")
              }
          }
      }
  }
}