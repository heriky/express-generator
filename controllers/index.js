// 文件上出处理

exports.index = (req, res)=>{
	res.render('./pages/index',{title: 'hk'})
}

exports.handleUpload = function (req,res,next) {
// 送来的file对象有属性{destination:缓存地址,encoding;filedname:表单中file字段的name值;filename：缓存生成的文件名不带后缀;originalname原始文件名带后缀;path:缓存的位置带文件名;size}
    var f =  req.files[0] ;
    var tmp_path = f.path ;  // 文件传送的临时保存地址

    console.log(f);
    var originalname = f.originalname ; // 使用这个名字来进行判断是否有文件上传
    if(originalname){
        fs.readFile(tmp_path, function (err, data) {
            if(err) {
                console.log(err);
            }
            var timestamp = Date.now() ;
            var type = f.mimetype.split('/')[1] ;
            var savename = utility.md5(timestamp+originalname)+'.'+type ;
            var savepath = path.join(__dirname,'../../public/upload/'+savename) ;
            fs.writeFile(savepath,data, function (err) {
                if(err) {
                    console.log(err);
                }
                req.poster = savename ;
                next();
            })
        })

    }else {
        next() ;
    }}