/*
 * @Date: 2022-07-27 08:13:40
 * @LastEditors: yangyehan 1958944515@qq.com
 * @LastEditTime: 2023-10-11 12:38:16
 * @FilePath: /xiaoyou/Users/mac/Desktop/Robot_front_10.10/sidebar/script.js
 * @Description: 
 */

//  侧边栏的js，其中这边就是获得html中的body、以及剩下的一切元素
const body=document.querySelector('body')
const sidebar=body.querySelector('nav')
const toggle=body.querySelector('.toggle')
const searchBtn=body.querySelector('.search-box')
const modeSwitch=body.querySelector('.toggle-switch')
const modeText=body.querySelector('.mode-text')
const Editp = body.querySelector('#Editp');
const EditRI = body.querySelector('#EditRI');
const home = body.querySelector("#home");
const iframe = body.querySelector("#iframe");
const carRouter = body.querySelector("#CarRouter");
const baozhang = body.querySelector("#baozhang");
toggle.addEventListener('click',()=>{
    sidebar.classList.toggle('close')
})

modeSwitch.addEventListener('click',()=>{
    body.classList.toggle('dark');
    if(body.classList.contains('dark')){
        modeText.innerText="Light mode"
    }else{
        modeText.innerText="Dark mode"
    }
})

Editp.addEventListener('click',()=>{
    iframe.src="../PersonalForm/index.html";
})

EditRI.addEventListener('click',()=>{
    iframe.src="../RobotInfo/index.html";
})

home.addEventListener('click',()=>{
   iframe.src="../PersonPage/index.html"
})

carRouter.addEventListener('click',()=>{
    iframe.src="../CarRouter/index.html"
})

baozhang.addEventListener('click',()=>{
    iframe.src="../CarRouter/baozhang.html"
})

function initAvatar(callback){
    
    var Time = new Object;
    Time.userid = localStorage.getItem("userid");
    let find = JSON.stringify(Time);

    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.responseType= 'text';
    xhr.open("POST","http://127.0.0.1:8080/MessageShow/getAvatar",true);
    xhr.setRequestHeader('content-Type','application/json');
    xhr.send(find);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status>= 200 && xhr.status<300)
            {
               if(xhr.response != null)
                {
                    localStorage.setItem("avatar",xhr.response);
                }
                else{
                    localStorage.setItem("avatar","./AVATAR.JPG");
                    alert("Hello new user!")
                }
                callback();
            }
        }
    }
};

//在加载页面的时候更新页面元素
window.onload = function() {
    
    // 在此处执行更新页面元素的操作
    document.querySelector("#userName").innerHTML ="Welcome" +" "+localStorage.getItem("username")
   
    initAvatar(function() {
        let avatarSrc = localStorage.getItem("avatar")
        console.log("avatar", avatarSrc, typeof (avatarSrc))
        if (localStorage.getItem("avatar")!="" && localStorage.getItem("avatar")!=null && localStorage.getItem("avatar")!="./AVATAR.JPG") {
            document.querySelector("#imgAvatar").src = localStorage.getItem("avatar");
        }
        else{
            document.querySelector("#imgAvatar").src = "./AVATAR.JPG";
        }
    });
};




