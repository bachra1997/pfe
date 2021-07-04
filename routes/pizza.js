 const express = require ("express");
const router = express.Router();
const { create , pizzaById , read ,remove , update , list, listRelated,
listCategories , listBySearch , photo} = require ("../controllers/pizza");
const { requireSignin  , isAuth,isAdmin} = require ("../controllers/auth");

const { userById } = require ("../controllers/user");



router.get('/pizza/:pizzaId', read);
router.post("/pizza/create/:userId",requireSignin, isAuth
	,isAdmin,create);
router.delete('/pizza/:pizzaId/:userId',requireSignin,isAuth ,isAdmin
	,remove);

router.put('/pizza/:pizzaId/:userId',requireSignin,isAuth ,isAdmin
	,update);

router.get("/pizzas",list);
router.get("pizzas/related/:pizzaId",listRelated);
router.get("/pizzas/categories",listCategories);
router.post("/pizzas/by/search", listBySearch);

router.get("/pizza/photo/:pizzaId",photo);


router.param("userId", userById);
router.param("pizzaId", pizzaById);




module.exports = router;     
 