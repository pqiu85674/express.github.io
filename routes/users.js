const express = require("express");
const cors = require("cors");

const admin = require("firebase-admin");

const serviceAccount = {
  "type": "service_account",
  "project_id": "database-3c8ec",
  "private_key_id": "90cc371347c8052080f4ad2197eb584f9cada197",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCcyPrvY1ZmjI5l\naeXVkv90HGS18Ef/9Fl1j11COsAQQVn+Kk+XfPPqbYcqcEpboM61Bd/6BoEIWnbB\nYY4WqIROWu1TH0XNEyj35ya32Cn0mZEUy4Fn77rs79nSkb/gIIx+vZp+zCjNDUEO\nqQrErO/vRQc0iU7PtDbpnGFxM/NLyGNcy7BtHnMJmXSUPPZ1KtULvcU3I2Z/CGcT\njxcw2gsO6toxhglV89mYRXt7BHVUyJb3ha+QT/AS5o84nt7Ow7fiNkIMhiN61CcM\nrUZsG8vVEHXEmXPw70WStZ8cgLJdDbslN3EAePXINpyprk29mrrj9ipaSGqf1S65\nxzTrryy5AgMBAAECggEAB8JspOdiMc4YCA3fKZxOV0VGeLitH45M1SQkxe/ZbJSH\nayxV5xXwjnQgQenvzCwfvtbNGHc08KBlizmUSivJ7ITUhQ4hqr4dg3Nlt6iTnv7w\nrrpJq8ayFiLiwWikOefyfB1PJaJeDJPw2dRk64nxkAJ3ElMPWvk81IAAVJVxH5l1\n6XkcrhjdLLZQhH6A1mUg6hRmA99FHLuM+E3W34B5E36Ug/9VRTWWTgI4XTLA+lv3\nuDP29YybpFr2h9U4fkk0b+iNwZxjDRLihIEJp0t43nicFxkC/uvR/GocG1b+9B1u\nEcQWTS6rOqr/VXZwkcLO/8TztDkc42I9yagAoU8ovwKBgQDYiPFspuHoxyDMfGRB\nDxd/c7qCIWVdXIFVrkb3fAFeskMSGK3UNRTfn2LeNtXOonS+MDr2bC6nug11+fid\nQ9Rhb6VBVzEdYTCxe3b/njQPm/XV1V6KmHT7jnwXn+yJeWX7q5He46xkB1zNmSqQ\nXewcS/SAWOISRjK1R1UXknp+mwKBgQC5XDyYhonyM1uNyTvGfpXGwkDliPQQAFbd\n8lbooLtstbZXxxaJ7qUpSAwPo1vm5RT5o12S8HeI6Y10vMFNYZnXkDRKN0Y2U+RK\nZyO3XhhXZe+u/kH31YNBMpY6OJMwfzrQY7ttoH3EhC1ulE0eorNp3UTVSHzy7dl5\nGZcl92RtOwKBgHurSueZMHE4OX1QlhmqOutp912XIUN/L8b1sEZspoOlIDVXrwAC\nCRfm+hqcCuTnV/G/rg1LoCHfWwzEZb+8G7JCh4mX+M8k0SCsuTwo6Ob5ViB4qnRR\nuo5pxGnhxsCFez+Pr9IzCiRfKBusnOizG8TVhKFBImz5dsCeKvU5jYh9AoGAHVgL\nw72wwuX8fXK5AtBxV5jS+0N2F75mAhbmSUeAxFHz/utmlwlvnhxoxGUBHIlxi5+g\nJa3pzoPiv/NNyrlDyItsq78aX2lif6DaV6IOym85xYM84EYt1Dl07Nyd+JR7tBfF\nyTIaFu0x4AqcNthc/MpppjYmibK7td8mPX1vqZcCgYBaP2dZZBLI+EWEKMo8j8jD\n9tO7ZFT36J73PN4z+4SYGmhIH6zcOVLB50h4EvWOYdB769Bl44C5BjRYoPErPKao\np99VoA5vQ1cmWM4juuBj5prmRYQPLf4u7vncTrr4TGGy4TO7vX01PinKYwzetMlo\nhl83+1AROMWuZbp4OzVhoA==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-9pxom@database-3c8ec.iam.gserviceaccount.com",
  "client_id": "102831591110432641179",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9pxom%40database-3c8ec.iam.gserviceaccount.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://database-3c8ec-default-rtdb.firebaseio.com/"
});

const db = admin.database();
const router = express.Router();

// 設置 CORS 選項，允許來自特定來源的請求
const corsOptions = {
  origin: "*", // 允許的來源
  methods: "GET,POST", // 允許的 HTTP 方法
  allowedHeaders: ["Content-Type"] // 允許的請求頭部
};
router.use(cors(corsOptions));

const response = new Response();

//POST 動作
router.post("/signup", function(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    response.message = "請輸入帳號及密碼";
    res.send(response);
  } else {
    db
      .ref("users")
      .orderByChild("email")
      .equalTo(email)
      .once("value", snapshot => {
        if (snapshot.exists()) {
          response.message = "此 email 已經被使用";
          res.send(response);
        } else {
          // 創建新的用戶節點
          const ref = db.ref("users").push();
          ref.set({ email, password }, error => {
            if (error) {
              response.message = "數據保存失敗";
              return res.send(response);
            }
            response.message = "註冊成功";
            res.send(response);
          });
        }
      });
  }
});

router.post("/signin", function(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    response.message = "請輸入帳號及密碼";
    res.send(response);
  } else {
    db
      .ref("users")
      .orderByChild("email")
      .equalTo(email)
      .once("value", snapshot => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userKey = Object.keys(userData)[0];
          const user = userData[userKey];

          // 比對密碼
          if (user.password === password) {
            response.message = "成功登入";
            res.send(response);
          } else {
            response.message = "密碼錯誤";
            res.send(response);
          }
        } else {
          response.message = "用戶不存在";
          res.send(response);
        }
      });
  }
});

router.use(function(req, res) {
  res.status(404).send("網址錯誤");
});
module.exports = router;
