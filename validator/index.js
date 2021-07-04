exports.userSignupValidator = (req , res , next) => {
req.check("nom","le nom est obligatoire").notEmpty()
req.check("email", "email doit etre entre 3 et 40 caractéres ")
.matches(/.+\@.+\..+/)
.withMessage("Email doit contenir @")
.isLength({
	min : 4 ,
	max : 40
});
req.check("password" ,"mot de passe est obligatoire").notEmpty()
req.check("password")
.isLength ({
	min : 6
})
.withMessage ("mot de passe doit contenir au moins 6 caractéres")
.matches(/\d/)
.withMessage("mot de passe doit contenir au moins un chiffre")
const errors =req.validationErrors()
if (errors){
	const firstError = errors.map (error => error.msg)[0];
	return res.status(400).json({error :firstError})
}
next();

}