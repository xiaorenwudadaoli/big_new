$(function() {
    var form = layui.form

    form.verify({
        repwd: function(value) {
            var newPwd = $(' [name=newPwd]').val()
            if (value !== newPwd) {
                return '两次密码不一致'
            }
        },
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function(value) {
            var oldPwd = $('[name=oldPwd]').val()
            if (value === oldPwd) {
                return "新旧密码不能一样"
            }

        }
    })



    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                    //重置表单
                $('.layui-form')[0].reset()
            }
        })
    })

















})