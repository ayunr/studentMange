var express = require('express');
var mongodb = require('mongoose');
var router = express.Router();

mongodb.connect("mongodb://127.0.0.1:27017/admin",function(err){
	if(!err){
		console.log('数据库已连接...');
	}
});

var schema=mongodb.Schema;
var adminSchema=new schema({
	username:String,
	password:String,
	truename:String,
	role:String,
	department:String,
	flag:String,
	sort:String
});
var adminModel=mongodb.model('admin',adminSchema,'admin');
//创建login对象模型
var logSchema=new schema({
	username:String,
	content:String,
	op_time:String,
	result:String,
	op_ip:String,
});
var logModel=mongodb.model('log',adminSchema,'log');





/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

//登陆页面,请求后台数据
router.post('/checklogin.html',function(req,res){
	var username=req.body.username;
	var psd=req.body.password;
	console.log(username,psd);
	adminModel.find({'username':username,'password':psd},function(err,data){
		if(data.length){
			res.cookie('login_user',username);
			res.send('1'); //有数据，验证成功 ，发1
		}else{
			res.send('0'); //没有数据，验证失败，发0
		}
	});
});

//cookie查询,是否登陆
router.get('/check_logined.html',function(req,res){
	// 获取cookie的用户登陆数据;
	if(req.cookies.login_user){
		res.send('1');
	}else{//没有登陆的数据,提示登陆,并则跳转到相应的登陆页面.
		res.send('alert("failed!");location.href="/admin/pages/login.html"');
	}
});

	//点击退出，跳出退出成功提示，并且进入登陆界面。
router.get('/clr_cookie.html',function(req,res){
	//res.send('111111');
	if(req.cookies.login_user){//可以不进行判断，因为既然是退出，说明已经处于登录状态，说明一定有cookie；
//		res.cookie('login_user','');
		res.clearCookie('login_user');
	}
	res.send('<script>alert("退出成功!");location.href="/admin/pages/login.html"</script>');
});


	//显示到全部用户到界面
router.get('/show_alluser.html',function(req,res){
	var pagesize=2;
	var page=req.query.page;
	adminModel.find({},function(err,data){
		var pagecount=Math.ceil(data.length/pagesize);
		var start = (page-1)*pagesize;
		//再找一次,从什么时候开始，并往下寻找几条显示为一个页面内容；
		adminModel.find({},function(err,data){
			data.push({'pagecount':pagecount});
			res.send(data);
		}).limit(pagesize).skip(start);
	})
})

	//新增新用户的信息
router.post('/add_user.html',function(req,res){
	console.log('22222');
	var data= new adminModel();
	var username=req.body.username;
	var password=req.body.password;
	var truename=req.body.truename;
	var role=req.body.role;
	var department=req.body.department;
	var sort=req.body.sort;
	var flag=req.body.flag;
	data.username=username;
	data.password=password;
	data.truename=truename;
	data.role=role;
	data.department=department;
	data.sort=sort;
	data.flag=flag;
	data.save(function(err){
		if(err){
			res.send(err);
		}else{
			var log=new logModel();
			log.username = req.cookies.login_user;
			log.content = '新增管理员'+req.body.username;
			var now_time=new Data();
			log.op_time=now_time.toLocaleString();
			log.result = 'success';
			log.ip = req.ip;
			log.save(function(){
				res.send('1');
			});
		}
	});
});
			
			
	//删除一行数据;			
router.post('/del.html',function(req,res){
	var ids=req.body['ids[]'];
	res.send('1111');
	adminModel.find({'_id':{$in:ids}},function(err,data){
		for(var i in data){
			data[i].remove();
		}
		res.send('1');
	});
});

	//修改行的内容；
router.get('/edit.html',function(req,res){
	var id=req.body.id;
	adminModel.findById(id,function(err,data){
		data.username = req.body.username;
		data.password = req.body.password;
		data.truename = req.body.truename;
		data.department = req.body.department;
		data.role = req.body.role;
		data.flag = req.body.flag;
		data.sort = req.body.sort;
		data.save(function(err){
			if(err){
				res.send('0');
			}else{
				res.send('1');
			}
		});
	});
});

	//查找数据
router.post('/admin_search.html',function(){
	var username = req.body.username;
	var department = req.body.depaetment;
	var role = req.body.role;
	var obj = {};
	if(department!=='全部'){
		obj.department = department;
	}
	if(role!=='全部'){
		obj.role = role;
	}
	if(username!==''){
		obj.username = new RegExp(username); 
	}
	adminModel.find(obj,function(err,data){
		res.send(data);
	});
});


//修改密码
router.post('/changepsd.html',function(req,res){
	console.log('111111');
})





//先测试通道
router.get('/test1.html',function(req,res){
	//res.cookie('username','AAAA');
	//var username=req.cookies.username;
	//res.clearCookie('username');
	res.send('ok');
});


module.exports = router;