import GroupsList from '../components/GroupsList';
import GroupForm from '../components/GroupForm';
import { useState } from "react";
import '../styles/HomePage.css';

export default function HomePage() {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [notes, setNotes] = useState([]);
    const addGroup = (group)=>{
      const updatedGroups = [...groups, group];
      setGroups(updatedGroups);
      localStorage.setItem('groups', JSON.stringify(updatedGroups));
    };
    const addNotes = (note)=>{
      const updatedNotes = [...notes, note];
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    };
    const selectGroup = (groupName)=>{
      setSelectedGroup(groupName);
    };
    const handleCreate = () =>{
      navigate("/create-group");
      // <GroupForm addGroup={addGroup}/>
    };
    return <>
      <div className="App">
        <div className="groups">
          <div className="title-right font-link">
            <h2>Pocket Notes</h2>
          </div>
          <div className="group-list">

          </div>
          {/* <GroupsList groups={groups} selectGroup={selectGroup}/> */}
          <div className="bottom-create">
            <button className="add-button" onClick={handleCreate}>+</button>
          </div>
        </div>
      </div>
    </>
}
