 const express = require ("express");
const router = express.Router();
const { create , dessertById , read ,remove , update , list, listRelated,
listCategories , listBySearch , photo} = require ("../controllers/dessert");
const { requireSignin  , isAuth,isAdmin} = require ("../controllers/auth");

const { userById } = require ("../controllers/user");



router.get('/dessert/:dessertId', read);
router.post("/dessert/create/:userId",requireSignin, isAuth
	,isAdmin,create);
router.delete('/dessert/:dessertId/:userId',requireSignin,isAuth ,isAdmin
	,remove);

router.put('/dessert/:dessertId/:userId',requireSignin,isAuth ,isAdmin
	,update);

router.get("/desserts",list);
router.get("desserts/related/:dessertId",listRelated);
router.get("/desserts/categories",listCategories);
router.post("/desserts/by/search", listBySearch);

router.get("/dessert/photo/:dessertId",photo);


router.param("userId", userById);
router.param("dessertId", dessertById);




module.exports = router;     
 