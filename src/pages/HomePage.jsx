import GroupsList from '../components/GroupsList';
import GroupForm from '../components/GroupForm';
import NotesPanel from '../components/NotesPanel';
import { useState, useEffect } from "react";
import '../styles/HomePage.css';
import mainPic from '../assets/main_page_bg.png';
import securityLock from '../assets/security_lock.png';

export default function HomePage() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [notes, setNotes] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groups'));
    if (storedGroups) {
      setGroups(storedGroups);
    }
  }, []);

  const addGroup = (group) => {
    const newGroup = { ...group, notes: [] };
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    console.log("in homePage ", groups);
  };

  const addNote = (notedetails) => {
    const updatedGroups = groups.map(group => {
        if (group.name === selectedGroup) {
            const notesArray = Array.isArray(group.notes) ? group.notes : [];
            return {
                ...group,
                notes: [...notesArray, { content: notedetails.content, timestamp: notedetails.timestamp }] // Include timestamp
            };
        }
        return group;
    });
    setGroups(updatedGroups);
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
};

  const selectGroup = (groupName) => {
    setSelectedGroup(groupName);
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  return <>
    <div className="App">
      <div className="groups">
        <div className="titleRight">
          <p>Pocket Notes</p>
        </div>
        <>
          <GroupsList groups={groups} selectGroup={selectGroup} selectedGroup={selectedGroup}/>
        </>
        <div className="bottomCreate">
          <button className="addButton" onClick={() => { setOpenModal(true) }}>+</button>
        </div>
      </div>
      {openModal && <GroupForm addGroup={addGroup} groups={groups} onClose={closeModal} />}
      {!selectedGroup && (<div className='homeBG'>
        <div className='themePic'>
          <img src={mainPic} alt="App theme cartoon" />
        </div>
        <div>
          <p id="appTitle">Pocket Notes</p>
          <p id="desc">Send and receive messages without keeping your phone online.<br />Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
        </div>
        <div className='privacyNote'>
          <img src={securityLock} alt="security lock" />
          <p>end-to-end encrypted</p>
        </div>
      </div>)}
      {selectedGroup && (<div className='notesPanel'>
        <NotesPanel selectedGroup={selectedGroup} addNote={addNote} groups={groups} />
      </div>)}
    </div>
  </>
}
