const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require ("fs");

// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get('/api/notes', async (req, res) => {
  const dbJson = await JSON.parse(fs.readFileSync("develop/db/db.json","utf8"));
  res.json(dbJson);
});

//
router.post('/api/notes', (req, res) => {
  const dbJson = JSON.parse(fs.readFileSync("develop/db/db.json","utf8"));
  const newFeedback = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  dbJson.push(newFeedback);
  fs.writeFileSync("develop/db/db.json",JSON.stringify(dbJson));
  res.json(dbJson);
});
// Delete request: Bonus
router.delete('/api/notes/:id', (req, res) => {
  let data = fs.readFileSync("develop/db/db.json", "utf8");
  const dataJSON =  JSON.parse(data);
  const newNotes = dataJSON.filter((note) => { 
    return note.id !== req.params.id;
  });
  fs.writeFileSync("develop/db/db.json",JSON.stringify(newNotes));
  res.json("Note deleted.");
});

module.exports = router; 
