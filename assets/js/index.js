$(function() {
    getUserInfo()
    var layer = layui.layer
        // 获取用户信息


    $('#btnLogout').click(function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            // 清空本地存储
            localStorage.removeItem('token')
                // 跳转网页
            location.href = 'login.html'

            layer.close(index);
        });
    })





















})

function getUserInfo() {
    $.ajax({
        method: "get",
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {

            if (res.status !== 0) {
                return layui.layer.msg('res.message')
            }
            // 获取成功，渲染头像

            randerAvatar(res.data)
        },

    })
}

function randerAvatar(user) {
    var name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)

    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.user-avatar').hide()
    } else {
        var first = name[0].toUpperCase()
        $('.user-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }

}