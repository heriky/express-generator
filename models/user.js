const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const ObjectId = Schema.Types.ObjectId;

// type: [String, Number,Boolean,Date,Buffer,Mixed
// ObjectId,Array]
var UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		default: 0
	},
	comments: [{
		type: ObjectId,
		ref: 'comment'
	}],
	meta:{
		createAt:{
			type: Date,
			default: Date.now()
		},
		updateAt:{
			type: Date,
			default: Date.now()
		}
	}
});

// 钩子
UserSchema.pre('save', next=>{
	if(this.isNew){
	}
	next() ; // 放行
})

// 静态方法
UserSchema.statics = {
	fetch: function(cb){
		return this.find({})
			.sort({pv: -1})
			.exec(cb)
	},
	findbyid: function(id, cb){
		return this.findOne({_id: id})
			.exec(cb);
	}
}

// 对象方法
UserSchema.methods = {} ;

// 输出模型
module.exports = mongoose.model('user', UserSchema);
