$(function() {
    //    点击注册与登录的切换
    $('#link_reg').click(function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').click(function() {
            $('.reg-box').hide()
            $('.login-box').show()
        })
        // 自定义校验
    var form = layui.form
    var layer = layui.layer
    form.verify({
        psw: [/^[\S]{6,12}$/, '密码必须是6-12位，且不能出现空格'],
        repsw: function(value) {
            // 两次密码校验
            var psw = $('.reg-box [name=password]').val()
            if (psw !== value) {
                return "两次密码不相同"
            }
        }

    })

    //监听注册的提交事件。
    $('#form_reg').on('submit', function(e) {
        e.preventDefault() //阻止默认请求
            // 发请求
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录')
            })
            // 自动点击，模拟人手
        $('#link_login').click()
    })

    // 监听登陆实际事件
    $('#form_login').submit(function(e) {
        e.preventDefault()

        // 发请求
        $.ajax({
            method: "post",
            url: '/api/login',
            //serialize()获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                console.log(res.token);
                layer.msg('登陆成功')
                    // 将token存到本地存储
                localStorage.setItem('token', res.token)

                location.href = 'index.html'
            }
        })









    })


})