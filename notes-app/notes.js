const fs = require("fs");
const getNotes = function () {
  return "your notes";
};
const addNote = (title, body) => {
  const notes = loadNotes();
  const dupVal = notes.find((note) => {
    return note.title === title || note.body === body;
  });

  if (!dupVal) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log("new note added!");
  } else {
    console.log("note title taken");
  }
};
const removeNote = (title) => {
  const notes = loadNotes();
  const notesKeep = notes.filter((data) => data.title !== title);

  if (notes.length > notesKeep.length) {
    saveNotes(notesKeep);
  } else {
    console.log("not found");
  }
};
const listNodes = () => {
    const notes = loadNotes();
    notes.forEach(element => {
        console.log(element.title);
    });
}
const readNotes = (title) => {
    const notes = loadNotes().find(val=>val.title === title)
    if(notes){
        console.log(notes.title,notes.body);
    }
}
const saveNotes = (notes) => {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};
const loadNotes = () => {
  try {
    const databuffr = fs.readFileSync("notes.json");
    const dataJson = databuffr.toString();
    return JSON.parse(dataJson);
  } catch (error) {
    return [];
  }
};
module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  lstnote:listNodes,
  readNot:readNotes
};
