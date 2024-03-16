import React, { useState } from 'react'
import '../styles/GroupForm.css';
export default function GroupForm({addGroup, groups}) {
  const [selectedColor, setSelectedColor] = useState('');
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');

  const colorsList = [ "#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"]; 
  const generateInitials = (name) => {
    const words = name.split(' ');
    if (words.length === 1) {
      return name.charAt(0).toUpperCase();
    } else {
      return words.reduce((initials, word) => initials += word.charAt(0), '').toUpperCase();
    }
  };
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName.trim()) {
      setError('Group name cannot be empty');
      return;
    }
    if (!selectedColor) {
      setError('Please select a color for the group');
      return;
    }
    if (groups.some(group => group.name === groupName.trim())) {
      setError('Group name must be unique');
      return;
    }
    const initials = generateInitials(groupName.trim());
    addGroup({ name: groupName.trim(), color: selectedColor, initials });
    setGroupName('');
    setSelectedColor('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-modal'>
        <div className='form-row'>
          <h1>Create New group</h1>
        </div>
        <div className='form-row'>
          <h2> Group Name</h2>
          <input
          id="group-input"
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
          />
        </div>
        <div className='form-row'>
          <h2> Choose colour</h2>
          <div className="color-options">
          {colorsList.map(color => (
            <div 
              key={color}
              className={`color-option ${selectedColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
            ></div>
          ))}
          </div>
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </form>
  );
};
