const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json());
const bodyParser = require('body-parser')
const LOGS = require("./accountApi");
const Comment = require('./comments');

app.use(bodyParser.json())
app.use("/api", LOGS)
mongoose.connect("mongodb+srv://satora:gapa1525@cluster0.m1tgxtj.mongodb.net/test")
  .then(() => {
    app.listen(5000, () => console.log('Server set http://localhost:5000'));
  })
//TODO gitignore
app.get('/heroes', async (req, res) => {
  let offset = 0
  const heroes = []
  while (offset < 1200) {
    let url = 'https://gateway.marvel.com/v1/public/characters?apikey=72819049b7a70c5a7560906f11e0a0df&hash=28f894fadc80d9f867e83d5ffc4e7f0c&ts=1680007036&&' +
      'offset=' + offset + '&limit=100'
    const response = await fetch(url);
    const data = await response.json();
    data.data.results.map(el => heroes.push(el))
    offset += 300
  }
  res.json({ "heroes": heroes })
})

app.get('/comics', async (req, res) => {
  const response = await fetch('https://gateway.marvel.com/v1/public/comics?apikey=72819049b7a70c5a7560906f11e0a0df&hash=28f894fadc80d9f867e83d5ffc4e7f0c&ts=1680007036&orderBy=modified&limit=100');
  const data = await response.json();
  res.json(data.data.results)
})

app.post('/comments', async (req, res) => {
  const user = req.body.user
  const title = req.body.title
  const commentContent = req.body.commentContent
  const stars = req.body.stars
  const comment = new Comment({
    user,
    title,
    commentContent,
    stars,
    date: (new Date().getTime() + (2 * 3600000))
  })
  comment.save()
  res.send("comment added")
})

app.get('/comments', async (req, res) => {
  const result = await Comment.find()
  res.json(result)
})