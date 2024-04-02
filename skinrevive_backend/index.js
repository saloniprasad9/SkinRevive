import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import "express-async-errors";
import db from "./conn.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.post("/user", async (req, res) => {
  console.log(req.body);
  const users = db.collection("users");
  const result = await users.insertOne(req.body);
  res.send(result).status(200);
});

// gets user by PhoneNumber
app.post("/userByPhone", async (req, res) => {
  const users = db.collection("users");
  const user = await users.findOne(req.body);
  res.send(user).status(200);
});

app.post("/addCartItem", async (req, res) => {
  const cart = db.collection("cart");
  const cartDetail = req.body;
  const exist = await cart.findOne({
    uid: cartDetail.uid,
    pid: cartDetail.pid,
  });

  if (exist) {
    await cart.updateOne(
      {
        uid: cartDetail.uid,
        pid: cartDetail.pid,
      },
      {
        $set: {
          count: exist.count + 1,
        },
      }
    );
  } else {
    cartDetail["count"] = 1;
    await cart.insertOne(cartDetail);
  }

  res.send(cartDetail).status(200);
});
// decreasing count of cart item
app.post("/removeCartItem", async (req, res) => {
  const cart = db.collection("cart");
  const cartDetail = req.body;
  const exist = await cart.findOne({
    uid: cartDetail.uid,
    pid: cartDetail.pid,
  });
  console.log(exist);
  if (exist.count > 1) {
    await cart.updateOne(
      {
        uid: cartDetail.uid,
        pid: cartDetail.pid,
      },
      {
        $set: {
          count: exist.count - 1,
        },
      }
    );
  } else {
    await cart.deleteOne({
      uid: cartDetail.uid,
      pid: cartDetail.pid,
    });
  }
  res.send(cartDetail).status(200);
});

app.post("/deleteFromCart", async (req, res) => {
  const cart = db.collection("cart");
  const cartDetail = req.body;
  await cart.deleteOne({
    uid: cartDetail.uid,
    pid: cartDetail.pid,
  });
  res.send(cartDetail).status(200);
});

app.post("/getCartItemsByUid", async (req, res) => {
  const cart = db.collection("cart");
  const cartDetail = await cart.find(req.body).toArray();
  res.send(cartDetail).status(200);
});

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send(`Uh oh! An unexpected error occured ${err}.`);
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
