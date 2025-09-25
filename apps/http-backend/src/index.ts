import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {
  CreateUserSchema,
  SigninSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      message: "incorrect data",
    });
  }

  try {
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data.username, // make sure schema has "username" or change to "email"
        password: parsedData.data.password,
        name: parsedData.data.name,
      },
    });

    res.json({
      userId: user.id, // return real user id instead of hardcoding "1"
    });
  } catch (e) {
    res.status(411).json({
      message: "user already exists",
    });
  }
});

app.post("/signin", (req, res) => {
  const data = SigninSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "incorrect data",
    });
    return;
  }

  const userId = 1;

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.json({
    token,
  });
});
app.get("/room", middleware, (req, res) => {
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "incorrect data",
    });
    return;
  }
  res.json({
    roomId: 132,
  });
});

app.listen(4000, () => {
  console.log("server started");
});
