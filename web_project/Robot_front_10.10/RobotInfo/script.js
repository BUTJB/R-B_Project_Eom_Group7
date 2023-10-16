
const body=document.querySelector('body');
const form = document.querySelector("form"),
statusTxt = form.querySelector(".button-area span");
const input = document.querySelectorAll("input")
const textarea = document.querySelector("textarea")
const btn= document.querySelector("button");




function initAvatar(callback){
    
  var Time = new Object;
  Time.userid = localStorage.getItem("userid");
  let find = JSON.stringify(Time);

  xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.responseType= 'text';
  xhr.open("POST","http://127.0.0.1:8080/MessageShow/getAvatarR",true);
  xhr.setRequestHeader('content-Type','application/json');
  xhr.send(find);
  xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
          if(xhr.status>= 200 && xhr.status<300)
          {
             if(xhr.response != null)
              {
                  localStorage.setItem("avatarR",xhr.response);
                  console.log("avatarR",localStorage.getItem("avatarR"))
              }
              else{
                  localStorage.setItem("avatarR","./AVATAR.JPG");
              }
              callback();
          }
      }
  }
};

//在加载页面的时候更新页面元素
window.onload = function() {
 
  initAvatar(function() {
      let avatarSrc = localStorage.getItem("avatarR")
      console.log("avatarR", avatarSrc, typeof (avatarSrc))
      if (localStorage.getItem("avatarR") != "./AVATAR.JPG" && localStorage.getItem("avatarR") != null && localStorage.getItem("avatarR")!="" ) {
          document.querySelector("#imgAvatar").src = localStorage.getItem("avatarR");
      }else{
        document.querySelector("#imgAvatar").src = "./AVATAR.JPG";
      }


    var Time = new Object;
    Time.state = "202";
    Time.userid = localStorage.getItem("userid");
    Time.robotid = localStorage.getItem("robotid");
      
    //创建一个与后端的通话xhr
    const xhr  = new XMLHttpRequest();
    let josnTime_string = JSON.stringify(Time);
    xhr.responseType= 'json';
    xhr.open("POST","http://localhost:8080/MessageShow/getMessageR",true);
    xhr.setRequestHeader('content-Type','application/json');
    xhr.send(josnTime_string);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status<300)
            {
              if(xhr.response!=null)
              {
                let robot = xhr.response
                console.log(xhr.response)
                input[1].value = robot.robotid;
                input[2].value = robot.phone;
                input[3].value = robot.email;
                if(robot.robotname!=null && robot.robotname!=""){
                  input[0].value = robot.robotname;
                }
                if(robot.message!=null && robot.message!=""){
                  textarea.value = robot.message;
                }if(robot.phone!=null && robot.phone!=""){
                  input[2].value = robot.phone;
                }
              }else{
                alert("Failed to get information, please try again later!")
              }
          }
      }
  }
      
  });
};


btn.addEventListener('click',()=>{
  statusTxt.style.color = "#0D6EFD";
  statusTxt.style.display = "block";
  statusTxt.innerText = "Sending your message...";
  form.classList.add("disabled");

  var robot = new Object;
  robot.robotid = localStorage.getItem("robotid");
  console.log("robotid",robot.robotid);
  input[0].value!="" ? robot.robotname = input[0].value : robot.robotname = null;
  //验证mail是否合法
  if(input[3].value!=""){
    if(validEmail(input[3].value)){
      robot.mail = input[3].value;
   }else{
       robot.mail = null;
       alert("Your mail is invalid!")
       return null;
   }
  }else{
    robot.mail = null;
  }
  input[2].value!="" ? robot.phone = input[2].value : robot.phone = null;
  textarea.value!="" ? robot.message = textarea.value : robot.message = null;

  const xhr  = new XMLHttpRequest();
  let josnUser_string = JSON.stringify(robot);
  xhr.open("POST","http://localhost:8080/Edit/EditRobotMessage",true);
  xhr.setRequestHeader('content-Type','application/json');
  xhr.send(josnUser_string);
  xhr.onreadystatechange = function(){
     if(xhr.readyState == 4){
         if(xhr.status>= 200 && xhr.status<300)
         {
             if(xhr.response === "true"){
             alert("Robot information refreshed!");
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
