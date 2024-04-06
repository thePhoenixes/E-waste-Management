import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Understanding E-Waste: A Growing Environmental Concern",
    content:
      "As technology advances, so does the volume of electronic waste (e-waste) generated globally. It's crucial to understand what constitutes e-waste and how improper disposal can harm the environment and human health. Learn about sustainable disposal practices and the importance of recycling electronics to mitigate these impacts.",
    author: "Vedant Patil",
    date: "2024-04-02T10:00:00Z",
  },
  {
    id: 2,
    title: "The Journey of E-Waste: From Collection to Recycling",
    content:
      "E-waste management involves a series of crucial steps, from collection to recycling. Discover the intricate process of how electronic devices are dismantled, sorted, and recycled to recover valuable materials while minimizing environmental pollution and health risks associated with improper disposal.",
    author: "Sam Williams",
    date: "2023-04-03T14:30:00Z",
  },
  {
    id: 3,
    title: "E-Waste Recycling: A Step Towards Sustainable Living",
    content:
      "Recycling e-waste not only conserves natural resources but also reduces energy consumption and greenhouse gas emissions. By opting for responsible disposal methods, individuals can contribute to a more sustainable future. Explore the benefits of e-waste recycling and how everyone can play a part in reducing electronic waste.",
    author: "Ankita Patil",
    date: "2023-04-04T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 


// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});


 

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
