// backend/routes/api/index.js
const router = require("express").Router();

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;

/*

fetch('/api/test', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": "w7XNQb0m-BDb4TsD8z0W7mKoDgFXp5g87ud4"
  },
  body: JSON.stringify({ hello: 'world' })
}).then(res => res.json()).then(data => console.log(data));
*/
