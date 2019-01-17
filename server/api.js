const mysql = require('mysql');
const wallpaper = require('./grasp/wallpaper')
const db_config = {
    host: "129.28.92.96",
    user: "root",
    password: "123456",
    port: "3306",
    database: "test"
}
const connection = mysql.createPool(db_config);
module.exports =  {
    // 登录
     UserLogin(req, res, next) {
        const selectUser = `SELECT * FROM login WHERE username='${req.body.name}'`;
        connection.query(selectUser, function (err, result) {
            if (err) {
                console.log("查询报错：", err.message);
                return;
            } else if (result.length == 0) {
                console.log("用户不存在")
                let data = {
                    'msg': '用户不存在',
                    'status': 0
                }
                res.json(data);
            } else {
                let data = {
                    'msg': '登录成功',
                    'status': 1
                }
                res.json(data);
                
            }
        })
    },
    // 注册
    UserRegister(req, res, next){
        const selectUser = `SELECT * FROM login WHERE username='${req.body.number}'`;
        connection.query(selectUser, function (err, result) {
            if (err) {
                console.log("查询报错：", err.message);
                return;
            } else if (result.length == 0) {
                console.log("用户不存在")
                addsql(req,res)
            } else {
                let data = {
                    'msg': '当前账号已注册',
                    'status': 1
                }
                res.json(data);
                
            }
        })
    },
    // 获取img
    async getimgdata(req,res,next){
        let promise = new Promise(function(resolve,reject){
            wallpaper.requestdata(resolve,reject)
        }).then(function (values){
            queryimg(req,res,next,values)
        })
    }
}
// 注册用户
function addsql(req,res) {
    let addsql = 'INSERT INTO login(id,username,password) VALUES(REPLACE(UUID(),"-",""),"'+req.body.number+'","'+req.body.password+'")';
    connection.query(addsql,function(err,result){
        if(err) {
            console.log("插入报错：", err.message);
            return;
        }else{
            let data = {
                'msg': '注册成功',
                'status': 0
            };
            return res.json(data)
        }
    })
}

// 查询img
function queryimg(req,res,next,values) {
    const selectImg = `SELECT * FROM img `;
    connection.query(selectImg,function(err,result) {
        if(err) {
            console.log("查询报错：", err.message);
            return;
        }else{
            screen(result,values)
        }
    })
}
// 去除数据库已有数据
function screen(result,values) {
    console.log("result-----"+JSON.stringify(values))
    for (let index = 0; index < result.length; index++) {
        let selectUser = `SELECT * FROM img WHERE imgsrc='${result[index].imgsrc}'`;
        connection.query(selectUser, function (err, result) {
            if (err) {
                console.log("查询报错：", err.message);
                return;
            } else if (result.length == 0) {
                console.log("图片不存在")
                addsql(req,res)
            } else {
                let data = {
                    'msg': '当前账号已注册',
                    'status': 1
                }
                res.json(data);
                
            }
        })
        
    }



    // var dataimg = {imgsrc:'',imgname:''};
	// var temp_imgname = [];
	// var temp_imgsrc = [];
	// for (var i = 0; i < result.length; i++) {
	// 	if (imgname.indexOf(result[i].imgname) == -1) {
	// 		temp_imgname.push(result[i].imgname);
	// 	}
	// }
	// for (var i = 0; i < result.length; i++) {
	// 	if (imgsrc.indexOf(result[i].imgsrc) == -1) {
	// 		console.log(result[i].imgsrc)
	// 		temp_imgsrc.push(result[i].imgsrc);
	// 	}
	// }
    // dataimg.imgsrc = temp_imgsrc;
    // dataimg.imgname = temp_imgname;
    // console.log('data----'+JSON.stringify(dataimg))
}
// 存储图片
function increase(values) {
    // console.log(values)
	for (var i = 0; i < values.imgsrc.length; i++) {
		// 建立表
		// connection.query("CREATE TABLE person(id int primary key,user varchar(255),password varchar(255))")
		// 增加数据
		if (values.imgsrc[i] && values.imgname[i]) {
			var addsql = 'INSERT INTO img(id,imgsrc,imgname) VALUES(REPLACE(UUID(),"-",""),"'+values.imgsrc[i]+'","'+values.imgname[i]+'")';
			connection.query(addsql,function (err,result) {
			if (err) {
				console.log('插入报错： - ',err.message);
				return;
			}
			console.log("插入成功！"+JSON.stringify(result))
		})
		}
	}
}
