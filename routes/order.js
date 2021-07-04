const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById,  } = require("../controllers/user");
const { create, listOrders, getStatusValues, orderById,updateOrderStatus} = require("../controllers/order");
const { tbadelquantite } = require("../controllers/product");
router.post(
    "/order/create/:userId",
    requireSignin,
    isAuth,
   
    create
);

router.get(
    "/order/status-values/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    getStatusValues
);

router.put(
    "/order/:orderId/status/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    updateOrderStatus
);

router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrders);
router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;
