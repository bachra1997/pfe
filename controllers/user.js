const User = require ('../models/user')
exports.userById=(req,res,next,id)=>{

	User.findById(id).exec((err,user)=>{

if(err|| !user ){
	return res.statuts(400).json({
		error : "Utilisateur non trouvé"
	});
};
req.profile = user ;
next();

	});}


exports.read =(req,res) => {
req.profile.hashed_password= undefined ;
req.profile.salt = undefined;
return res.json (req.profile);

};


exports.update = (req,res)=> {
	User.findOneAndUpdate ({_id : req.profile._id}, 
		{$set : req.body}, 
		{new : true},
		(err,user)=> {
			if(err){
				return res.status(400).json({
					error : "vous etes non autorisés de faire cette action"
				});
			}
			user.hashed_password= undefined ;
user.salt = undefined;
res.json(user);
		}
		);
};