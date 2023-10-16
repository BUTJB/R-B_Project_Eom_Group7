const input = document.querySelectorAll("input");
const textarea = document.querySelector("textarea");
const showMessage = document.querySelector("#showMessage");
for(var i=0;i<input.length;i++)
{
    input[i].readOnly = "readonly";
}

textarea.readOnly = "readonly";

//显示信息
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
                input[1].value=  localStorage.getItem("robotid");
                input[2].value = user.phone;
                input[3].value = user.mail;
                textarea.value = user.message;
                }else{
                    alert("Failed to get information, please try again later!")
                }
            }
        }
    }
 }