import React, { useState , useRef } from 'react';
import disabledSend from '../assets/disabledSend.png';
import enabledSend from '../assets/enabledSend.png';
import backArrow from '../assets/backArrow.png';
import '../styles/NotesPanel.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


export default function NotesPanel({ selectedGroup, addNote, groups, showLeftPanel }) {
    const [newNote, setNewNote] = useState('');
    const noteDisplayAreaRef = useRef(null);

    const handleChange = (event) => {
        setNewNote(event.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const timestmp = new Date();
        if (newNote.trim()) {
            addNote({ content: newNote, timestamp: timestmp });
            setNewNote('');
            // Scroll to the latest note after adding it
            setTimeout(() => {
                if (noteDisplayAreaRef.current) {
                    noteDisplayAreaRef.current.scrollTo({
                        top: noteDisplayAreaRef.current.scrollHeight,
                        behavior: 'smooth',
                    });
                }
            }, 0);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e);
        }
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

    const goBackToHome = () => {
        showLeftPanel(); // Show the left panel
    };

    return <>
        <div className='chosenGroup'>
            {window.innerWidth <= 880 && (
                <div>
                    <button onClick={goBackToHome} id='sendBack'>
                        <Link to="/note-stash/" id='backToHome'>
                            <img src={backArrow} alt="go back arrow" style={{height: '15px', width: '20px'}}/>
                        </Link>
                    </button>
                </div>
            )}
            <div className='roundDiv justifyCenter' style={{ backgroundColor: selectedGroupData.color }}>{selectedGroupData.initials}</div>
            <div className='justifyCenter'><span >{selectedGroup}</span></div>
        </div>
        <div className="noteDisplayArea" ref={noteDisplayAreaRef}>
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
                    onKeyDown={handleKeyPress}
                    placeholder="Enter your text here..........."
                    rows={4}
                />
                <button id="sendBtn" type="submit" disabled={!newNote.trim()}>
                    <img src={newNote.trim() ? enabledSend : disabledSend} alt="Send" style={{ height: '20px', width: '25px' }} />
                </button>
            </form>
        </div>
    </>
}
