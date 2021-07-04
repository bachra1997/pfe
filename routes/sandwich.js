 const express = require ("express");
const router = express.Router();
const { create , sandwichById , read ,remove , update , list, listRelated,
listCategories , listBySearch , photo} = require ("../controllers/sandwich");
const { requireSignin  , isAuth,isAdmin} = require ("../controllers/auth");

const { userById } = require ("../controllers/user");



router.get('/sandwich/:sandwichId', read); 
router.post("/sandwich/create/:userId",requireSignin, isAuth
	,isAdmin,create);
router.delete('/sandwich/:sandwichId/:userId',requireSignin,isAuth ,isAdmin
	,remove);

router.put('/sandwich/:sandwichId/:userId',requireSignin,isAuth ,isAdmin
	,update);

router.get("/sandwichs",list);
router.get("sandwichs/related/:sandwichId",listRelated);
router.get("/sandwichs/categories",listCategories);
router.post("/sandwichs/by/search", listBySearch);

router.get("/sandwich/photo/:sandwichId",photo);


router.param("userId", userById);
router.param("sandwichId", sandwichById);




module.exports = router;     
 