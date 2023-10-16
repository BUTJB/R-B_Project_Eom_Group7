const container = document.querySelector('#container');
const signInButton = document.querySelector('#signIn');
const signUpButton = document.querySelector('#signUp');
signUpButton.addEventListener('click', () => container.classList.add
('right-panel-active'));
signInButton.addEventListener('click', () => container.classList.remove
('right-panel-active'));

//机器人信息修改警告
$('#robotModify').on({
    click:function(){
        alert("Please login first！");
    }
})



//登录
$('#login').on({
    click:function(){
        performLogin()
    },
});

$('#pass').keydown(function(e){
    if(e.keyCode === 13){
        performLogin()
    }
})

function  performLogin(){
    $.ajax({
        type:'post',
        contentType:"application/json;charset=UTF-8",
        url:'http://127.0.0.1:8080/Login/login',
        data:JSON.stringify({
            username:$('#admin').val(), //获取用户名这里面就是和html中的admin对应
            //md5加密传输，“huahua”是盐值
            password:md5($('#pass').val()+"huahua")
        }),
        xhrFields:{
            withCredentials:true
        },
        //这里的list是后端返回的json数据！！！需要结合后端一起看
        success:function(list){
            if(list.state==="true")
            {
                //将用户信息存入本地缓存相当于本次会话未结束前都可以使用（在其它js中也可以使用）
                localStorage.setItem("userid",list.userid);
                localStorage.setItem("username",list.username);
                localStorage.setItem("avatar",list.avatar);
                localStorage.setItem("robotid",list.robotid);
                console.log(list.robotid);
                alert("Successfully login！");
                window.location.href="./sidebar/index.html";
            }else if(list.state === "false"){
                alert("Wrong username or password！");
            }
            else{
                alert("The system is in repairing！");
            }
            
        }
    })
};

//正则表达式验证邮箱有效性函数,返回值为ture or false
function validEmail(email)
{
   var rep = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
   return rep.test(email);
}



//邮件验证码
let code;
$('#send_code').click(function(){
    if(validEmail($('#mail').val())){
        $.ajax({
            type:"post",
            contentType:"application/json",
            url:"http://127.0.0.1:8080/mails/code",
            data:JSON.stringify({
                mail:$('#mail').val()
            }),
            xhrFields:{
                withCredentials:true
              },
            success:function(data){
                if(data != "false")
                   code = data;
                else{
                    alert("server error! Please report to manager!");
                }   
            }
        })
    }else{
         alert("Please enter a valid email address!");
    }
        
    })




//注册
$("#register").click(function(){
  performRegister();
 }
)

$("#code").keydown(function(e){
    if(e.keyCode === 13){
        performRegister()
    }
})

function performRegister(){
    if($('#code').val()===code)
  {
    $.ajax({
        type:"post",
        contentType:"application/json",
        url:"http://127.0.0.1:8080/Login/register",
        data:JSON.stringify({
            username:$('#admin_z').val(),
            password:md5($('#pass_z').val()+"huahua"),
            mail:$('#mail').val()
        }),
        xhrFields:{
            withCredentials:true
          },
      success:function(list){
         if(list.state === "true")
         {
            localStorage.setItem("userid",list.userid);
            localStorage.setItem("username",list.username);
            localStorage.setItem("avatar","");
            localStorage.setItem("robotid",list.robotid);
            alert("Successfully register！");
            window.location.href="./sidebar/index.html";
         }
         else if(list.state ==="false")
         {
            alert("Your email or username has already been registered");
         }
         else{
            alert("System is in repairing！")
         }
      }
    })
  }else{
      alert("Wrong verification！");
  }
}