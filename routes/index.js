var express = require("express");
var router = express.Router();

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
    response.message = "成功登入";
    res.send(response);
  } else {
    /*     res.send({
      status: false,
      message: "已經有相同帳號"
    }); */
    response.message = "成功登入";
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
