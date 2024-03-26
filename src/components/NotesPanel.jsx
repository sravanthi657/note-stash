import React, { useState } from 'react';
import disabledSend from '../assets/disabledSend.png';
import enabledSend from '../assets/enabledSend.png';
import '../styles/NotesPanel.css';

export default function NotesPanel({ selectedGroup, addNote, groups }) {
    const [newNote, setNewNote] = useState('');
    const handleChange = (event) => {
        setNewNote(event.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const timestmp = new Date(); 
        if (newNote.trim()) {
            addNote({content:newNote, timestamp:timestmp});
            setNewNote('');
        }
        console.log("submit ",{content:newNote, timestamp:timestmp} )
    };
    const selectedGroupData = groups.find(group => group.name === selectedGroup);
    const formatDateTime = (selectedTime) => {
    const date = new Date(selectedTime);
    console.log("from selectedGroupData timestamp ", date)
    const optionsDate = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-IN', optionsDate);

    const optionsTime = { hour: 'numeric', minute: '2-digit', hour12: true };
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

    return formattedDate + ' • ' + formattedTime;
};

    return <>
        <div className='chosenGroup'> 
            <div className='roundDiv justifyCenter' style={{ backgroundColor: selectedGroupData.color }}>{selectedGroupData.initials}</div>
            <div className='justifyCenter'><span >{selectedGroup}</span></div>
        </div>
        <div>
        {selectedGroupData && selectedGroupData.notes ? (<ul className='noteList'>
            {selectedGroupData.notes.map((note, index) => (
                <li key={index}>
                    {note.content}
                    <div className="dateTime">{formatDateTime(note.timestamp)}</div>
                </li>
            ))}
        </ul>
        ) : <></>}
        </div>
        <div className='noteTextArea'>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={newNote}
                    onChange={handleChange}
                    placeholder="Enter your text here..........."
                    rows={4}
                />
                <button id="sendBtn" type="submit" disabled={!newNote.trim()}>
                    <img src={newNote.trim() ? enabledSend : disabledSend} alt="Send" style={{height:'20px', width:'25px'}}/>
                </button>
            </form>
        </div>
    </>
}
