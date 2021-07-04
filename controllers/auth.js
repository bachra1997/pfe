const User = require ('../models/user');
const jwt =require ('jsonwebtoken');
const {errorHandler} = require('../helpers/dbErrorHandler');//pour generer sign token
const expressJwt = require ('express-jwt'); //pour lautorisation

exports.signup =(req, res)=> {
	console.log("req.body", req.body);
	const user = new User (req.body);
	user.save((err,user) =>{
		if (err) {
			return res.status(400).json({
				err : errorHandler(err) 
			});
		}
		user.salt = undefined;
		user.hashed_password = undefined ;
		res.json({user});
	})
};
exports.signin =(req , res) => {
	//find lutilisateur par  email
	const {email, password}= req.body;
	User.findOne ({email},(err,user) =>{

		if (err || !user){
			return res.status(400).json({
				error: "Utilisateur inexistant"   
			
			}); }


//ken user mawjoud make sur lemail et le password 
//create authenticate meth in user model
if ( !user.authenticate(password) ){

	return res.status(401).json({
		error : "email ou password incorrects"
	});}


//generer sign token aver id et secret
const token =jwt.sign({_id : user._id }, process.env.JWT_SECRET);
res.cookie("t", token, {expire : new Date()+ 9999});
const {_id  , nom ,email, role} = user; //ne9esha has already been declared ,email tasteha sinon ray ghalta f les parentheses {()}
return res.json ({token, user : { _id  , nom ,email, role }});
});};


exports.signout =(req,res) => {
	res.clearCookie("t");
	res.json({message : "Déconnexion réussite"});
};

exports.requireSignin =expressJwt({
	secret : process.env.JWT_SECRET,  algorithms: [  'sha1', 'RS256', 'HS256'] ,
	userProperty : "auth"
});


exports.isAuth = (req , res ,next) => {

	let user = req.profile && req.auth && req.profile._id == req.auth._id;
	if (!user){
		return res.status(403).json ({
			error :"Accées refusé"
		})
	}
	next();
};



exports.isAdmin = (req , res ,next) => {

	if(req.profile.role ===0)
	{
		return res.status(403).json({error : "Admin ressource , accées refusé"

		});
	} next(); 
}











