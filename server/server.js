const express = require("express");
const app = express();
const PORT = 3001;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");

app.use(express.json());
app.use(cors());

//display all users
app.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

//create a user
app.post("/", async (req, res) => {
  const newUser = await prisma.user.create({
    data: req.body,
  });
  res.json(newUser);
});

//allow them to update just the age.
app.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const newAge = req.body.age;
  const updateUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      age: newAge,
    },
  });
  res.json(updateUser);
});

//delete a user
app.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const deleteUser = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  res.json(deleteUser);
});

//display all houses
app.get("/house", async (req, res) => {
  const allHouse = await prisma.house.findMany({
    include: {
      owner: true,
      builtBy: true,
    },
  });
  res.json(allHouse);
});

//create a house
app.post("/house", async (req, res) => {
  const newHome = await prisma.house.create({
    data: req.body,
  });
  res.json(newHome);
});

app.get("/house/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const singleHouse = prisma.house.findUnique({
    where: {
      id,
    },
    include: {
      owner: true,
      builtBy: true,
    },
  });
  res.json(singleHouse);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
