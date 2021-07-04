 const express = require ("express");
const router = express.Router();
const { create , boissonById , readb ,remove , update , list, listRelated,
listCategories , listBySearch , photo} = require ("../controllers/boisson");
const { requireSignin  , isAuth,isAdmin} = require ("../controllers/auth");

const { userById } = require ("../controllers/user");



router.get('/boisson/:boissonId', readb);
router.post("/boisson/create/:userId",requireSignin, isAuth
	,isAdmin,create);
router.delete('/boisson/:boissonId/:userId',requireSignin,isAuth ,isAdmin
	,remove);

router.put('/boisson/:boissonId/:userId',requireSignin,isAuth ,isAdmin
	,update);

router.get("/boissons",list);
router.get("boissons/related/:boissonId",listRelated);
router.get("/boissons/categories",listCategories);
router.post("/boissons/by/search", listBySearch);

router.get("/boisson/photo/:boissonId",photo);


router.param("userId", userById);
router.param("boissonId", boissonById);




module.exports = router;     
 