 const express = require ("express");
const router = express.Router();
const { create , offreById , reado ,remove , update , list, listRelated,
listCategories , listBySearch , photo} = require ("../controllers/offre");
const { requireSignin  , isAuth,isAdmin} = require ("../controllers/auth");

const { userById } = require ("../controllers/user");



router.get('/offre/:offreId', reado);
router.post("/offre/create/:userId",requireSignin, isAuth
	,isAdmin,create);
router.delete('/offre/:offreId/:userId',requireSignin,isAuth ,isAdmin
	,remove);

router.put('/offre/:offreId/:userId',requireSignin,isAuth ,isAdmin);

router.get("/offres",list);
router.get("offres/related/:offreId",listRelated);
router.get("/offres/categories",listCategories);
router.post("/offres/by/search", listBySearch);

router.get("/offre/photo/:offreId",photo);


router.param("userId", userById);
router.param("offreId", offreById);




module.exports = router;     
 