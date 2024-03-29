import React, { useState, useEffect, useRef } from 'react';
import '../styles/GroupForm.css';
export default function GroupForm({ addGroup, groups, onClose }) {
  const [selectedColor, setSelectedColor] = useState('');
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  const colorsList = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"];
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
    const newEntry = { name: groupName.trim(), color: selectedColor, initials };
    addGroup(newEntry);
    console.log(newEntry);
    setGroupName('');
    setSelectedColor('');
    setError('');
    onClose();
  };

  return (
    <div className='modalBackground'>
      <div className='formModal' ref={modalRef}>
        <form onSubmit={handleSubmit}>
          <div className='formHead'>
            <p>Create New group</p>
          </div>
          <div className='formRow'>
            <p> Group Name</p>
            <input
              id="groupInput"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
            />
          </div>
          <div className='formRow'>
            <p> Choose colour</p>
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
        </form>
      </div>
    </div>
  );
};
