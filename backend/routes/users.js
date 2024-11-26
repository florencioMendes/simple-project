const express = require("express")
const router = express.Router()
const GET = require("../controllers/users/GET")
const POST = require("../controllers/users/POST")
const PUT = require("../controllers/users/PUT")

router.get("/:id", GET.index)
router.post("/", POST.index)
router.put("/:id", PUT.index)

module.exports = router