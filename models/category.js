const mongoose = require ('mongoose');


const categorySchema = new mongoose.Schema ({
	nom : {
		type : String ,
		trim : true ,
		required : true , 
		maxlength : 40,
		unique:true
	}

	},
	{timestamps : true}

);


module.exports = mongoose.model("Category" , categorySchema); 