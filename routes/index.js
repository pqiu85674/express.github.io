var express = require("express");
var cors = require("cors");

var router = express.Router();

// 設置 CORS 選項，允許來自特定來源的請求
const corsOptions = {
  origin: "*", // 允許的來源
  methods: "GET,POST", // 允許的 HTTP 方法
  allowedHeaders: ["Content-Type"] // 允許的請求頭部
};
router.use(cors(corsOptions));
let Users = [];

const response = new Response();

/* GET home page. */
/* router.get("/", function(req, res, next) {
  // res.render("index", { title: "Express" });
  res.send({
    status: "true",
    message: "message",
    Users: Users
  });
}); */
//POST 動作
router.post("/signup", function(req, res) {
  if (Users.filter(item => item.email === req.body.email).length === 0) {
    Users.push({
      email: req.body.email,
      password: req.body.password
    });
    /*     res.send({
      status: true,
      message: "成功",
      Users: Users
    }); */
    response.message = "註冊帳號成功";
    res.send(response);
  } else {
    /*     res.send({
      status: false,
      message: "已經有相同帳號"
    }); */
    response.message = "無法註冊帳號";
    res.send(response);
  }
});

router.post("/signin", function(req, res) {
  if (
    Users.filter(
      item =>
        item.email === req.body.email && item.password === req.body.password
    ).length === 1
  ) {
    /*     res.send({
      status: "true",
      message: `哈囉 ${req.body.email} ，成功登入`
    }); */
    response.message = "成功登入";
    res.send(response);
  } else {
    /*     res.send({
      status: "false",
      message: "無法登入"
    }); */
    response.message = "無法登入";
    res.send(response);
  }
});

router.use(function(req, res) {
  res.status(404).send("網址錯誤");
});
module.exports = router;
