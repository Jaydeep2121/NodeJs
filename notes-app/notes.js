const fs = require('fs');
const getNotes = function(){
    return 'your notes';
}
const addNote = function(title,body){
    const notes = loadNotes();
    const dupVal = notes.filter((note)=>{
        return (note.title === title || note.body === body);
    })

    if(dupVal.length === 0){
        notes.push({
            title:title,
            body:body
        });
        saveNotes(notes);
        console.log('new note added!');
    }else{
        console.log('note title taken');
    }
}
const removeNote = function(title){
    const notes = loadNotes();
    const notesKeep = notes.filter((data)=>{
        return data.title !== title
    })
    if(notesKeep.length===0){
        saveNotes(notesKeep);
    }else{
        console.log('not found');
    }
}
const saveNotes = function(notes){
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJson);
}
const loadNotes = function(){
    try {
        const databuffr = fs.readFileSync('notes.json');
        const dataJson = databuffr.toString();
        return JSON.parse(dataJson);    
    } catch (error) {
        return [];
    }
}
module.exports = {
    getNotes:getNotes,
    addNote:addNote,
    removeNote:removeNote
}