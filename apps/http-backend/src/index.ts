import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreateRoomSchema } from "@repo/common/types";

const app = express();

app.post("/singup", (req, res) => {
  //dbcall

  res.json({
    userId: "62536",
  });
});
app.post("/signin", (req, res) => {
  const userId = 1;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
  res.json({
    token,
  });
});
app.post("/room", middleware, (req, res) => {
  //dbbcall

  res.json({
    message: "done",
  });
});

app.listen(3001);
