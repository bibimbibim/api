const express = require("express");
const app = express();
const minecraftData = require("minecraft-data");
const mcData = minecraftData("1.19");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//임시 데이터
const users = [
    { id: 1, name: "유저1" },
    { id: 2, name: "유저2" },
    { id: 3, name: "유저3" },
];

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/users", (req, res) => {
    //유저 정보 반환
    res.json({ ok: true, users: users });
});

// http://localhost:3000/api/users/user?user_id=1
app.get("/api/users/user", (req, res) => {
    const user_id = req.query.user_id;

    //filter라는 함수는 자바스크립트에서 배열 함수이다.
    // 필터링을 할때 많이 사용된다
    // 필터링한 데이터를 새로운 배열로 반환한다.
    const user = users.filter((data) => data.id == user_id);

    res.json({ ok: false, user: user });
});

app.get("/api/users/block/:name", (req, res) => {
    const name = req.params.name;
    const info = mcData.blocksByName[`${name}`];
    console.log(name, info);

    res.json({ ok: false, block: info });
});

const port = 8001;
app.listen(port, () => {
    console.log(`서버 ${port}에서 실행 중..`);
});
