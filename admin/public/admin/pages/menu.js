var text=	'<nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">\
        <div class="navbar-header">\
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">\
                <span class="sr-only">Toggle </span>\
                <span class="icon-bar"></span>\
                <span class="icon-bar"></span>\
                <span class="icon-bar"></span>\
            </button>\
        </div>\
         <div class="navbar-default sidebar" role="navigation">\
            <div class="sidebar-nav navbar-collapse">\
                <ul class="nav" id="side-menu">\
                        <div class="input-group custom-search-form">\
                            <input type="text" class="form-control" placeholder="Search...">\
                            <span class="input-group-btn">\
                            <button class="btn btn-default" type="button">\
                                <i class="fa fa-search"></i>\
                            </button>\
                        </span>\
                        </div>\
                    <li>\
                        <a href="#"><i class="fa fa-files-o fa-fw"></i> 系统管理<span class="fa arrow"></span></a>\
                        <ul class="nav nav-second-level">\
                            <li>\
                                <a href="userlist.html">用户管理</a>\
                            </li>\
                            <li>\
                                <a href="editpassword.html">修改密码</a>\
                            </li>\
                             <li>\
                                <a href="log.html">日志管理</a>\
                            </li>\
                            <li>\
                                <a href="login.html">退出系统</a>\
                            </li>\
                        </ul>\
                    </li>\
                </ul>\
            </div>\
        </div>\
    </nav>';
document.write(text);