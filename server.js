const express = require("express");
const app = express();
const PORT = 3001;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

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

app.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const deleteUser = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  res.json(deleteUser);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
