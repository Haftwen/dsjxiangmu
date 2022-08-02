$(function () {
  // 点击去注册账号让 登录框隐藏，注册框显示
  $("#link_reg").click(() => {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  // 点击去登录让 注册框隐藏，登录框显示
  $("#link_login").click(() => {
    $(".login-box").show();
    $(".reg-box").hide();
  });
// 从 LayUI 中获取 form 对象
const form = layui.form;
 // 设置请求根路径
//  const baseUrl = "http://www.liulongbin.top:3007";
 // 好看得弹窗
  // 获取 layui 弹窗
const layer = layui.layer;
// 通过 form.verify() 方法自定义校验规则
form.verify({
    // 自定义一个叫 pwd 的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验两次密码是否一致的规则
    repwd: (val) => {
        // 通过形参拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败,则return一个提示消息即可
        const pwd = $(".reg-box [name=password").val();
        if(pwd !== val) return "两次密码不一致"
    },
});
   
// 表单注册得提交事件，我们用submit来绑定
$('#form_reg').on('submit',function(e){
   // 阻止默认提交
   e.preventDefault()
   // 拿到这个表单得全部的内容
   const data = $(this).serialize()
   $.ajax({
    type:'POST',
    url:'/api/reguser',
    data,
    success:res=>{
      const {message,status} = res
      if(status !==0) return layer.msg(message)
      $('#link_login').click()
    }
   })

})
// 登录事件
$('#form_login').on('submit',function(e){
  // 阻止默认提交
  e.preventDefault()
  // 拿到这个表单得全部的内容
  const data = $(this).serialize()
  console.log(data);
  $.ajax({
   type:'POST',
   url:'/api/login',
   data,
   success:res=>{
    const {message,status} = res
    if(status !==0) return layer.msg(message)
    // 将登录成功得到的 token 字符串，保存到 localStorage 中
    localStorage.setItem("token", res.token);
    // 跳转到主页
    location.href = "/index.html";

   }
  })
})
  

    }); // 入口函数的结束

