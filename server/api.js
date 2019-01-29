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
    getimgdata(req,res,next){
        let promise = new Promise(function(resolve,reject){
            wallpaper.requestdata(resolve,reject)
        }).then(function (values){
            removedata(req,res,next,values)
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
// function queryimg(req,res,next,values) {
//     const selectImg = `SELECT * FROM img `;
//     connection.query(selectImg,function(err,result) {
//         if(err) {
//             console.log("查询报错：", err.message);
//             return;
//         }else{
//             screen(result,values)
//         }
//     })
// }
// 删除原始数据
function removedata(req,res,next,values){
    let removesql = 'delete from img';
    connection.query(removesql,function(err,result){
        if(err) {
            console.log('清除失败：',err.message);
            return;
        }else{
            increase(req,res,next,values)
        }
    })
}

// 存储图片
function increase(req,res,next,values) {
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
    let data = {'img':values.imgsrc,'code':1}
    return res.json(data);
}
