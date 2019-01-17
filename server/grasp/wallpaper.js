let imgsrc = [];
let imgname = [];
// 处理编码格式
let iconv = require('iconv-lite');
// request类似于ajax的方式获取一个url里的html代码
let request = require('request');
// cheerio类似于jQuery那样对所获取的html代码进行处理
let cheerio = require('cheerio');
// 抓取路径
let requrl1 = "https://bing.ioliu.cn/";
// 发起请求
exports.requestdata = function requestdata(resolve,reject) {
    request(requrl1,function (error,response,body) {
        // 验证请求是否成功
        if (!error && response.statusCode == 200) {
            console.log('请求成功....')
            let imgdata = getDatas(body);
            resolve(imgdata)
        }else{
            console.log('请求失败...');
        }
    })
}
function getDatas(body) {
	// var change_data = iconv.decode(body,'utf-8')
	// console.log(change_data.toString())
	let $ = cheerio.load(body);
	// 获取class为pic下的所有img标签
	let meizi = $('.container img').toArray();
	for (let i = 0; i < meizi.length; i++) {
		if (meizi[i].attribs.src) {
			imgsrc.push(meizi[i].attribs.src);
			imgname.push("壁纸"+i);
			// console.log(JSON.stringify(imgname));
		}else{
			console.log("缺失attribs.src")
		}
    };
    return {imgsrc:imgsrc,imgname:imgname}
}