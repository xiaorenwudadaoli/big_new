$(function() {

    var form = layui.form

    // 创建表单验证
    form.verify({
        nikename: function(value) {
            if (value.length > 6) {
                return '昵称过长'
            }
        }


    })


    initUserName()

    $('#btnReset').click(function(e) {
        e.preventDefault()
        initUserName()

    })

    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('修改失败')
                }
                layui.layer.msg('修改成功')
                    //子页面调用父页面的函数
                window.parent.getUserInfo()
            }

        })
    })

    function initUserName() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',

            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                // $('input[name=username]').val(res.data.username)
                // $('input[name=nikename]').val(res.data.nikename)
                // $('input[name=email]').val(res.data.email)
                //form.val()快速赋值
                form.val('formUserInfo', res.data)
            }

        })
    }




    // 表单提交












})