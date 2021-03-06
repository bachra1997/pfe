const mongoose = require ('mongoose');
const {ObjectId} =mongoose.Schema;

const offreSchema = new mongoose.Schema ({
	nom : {
		type : String ,
		trim : true ,
		required : true , 
		maxlength : 40
	

	},
	description : {
		type : String ,
		required : true , 
		maxlength : 2500
	

	},
	price : {
		type : Number ,
		trim:true,
		
		maxlength : 40
	

	},

	category : {
		type : ObjectId  ,
		ref : 'Category' , 
		required : true 
	

	},

quantity : {
	type : Number },

	photo : {
		data : Buffer ,
		contentType : String

	},
	shipping : {
		required : false ,
		type : Boolean   
	}

	},


	{timestamps : true}


);



module.exports = mongoose.model("Offre" , offreSchema);