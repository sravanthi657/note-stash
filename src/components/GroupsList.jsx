import React from 'react';
import '../styles/GroupsList.css';

export default function GroupsList({ groups, selectGroup , selectedGroup}) {
  return <>
    <div className='groupsList'>
      <ul>
        {groups.map((group) => (
          <li id="notesList" key={group.name} onClick={() => selectGroup(group.name)} className={selectedGroup === group.name ? 'selected' : ''}>
              <div className='roundDiv justifyCenter' style={{backgroundColor: group.color}}>{group.initials}</div>
              <div className='justifyCenter'><span >{group.name}</span></div>
          </li>
        ))}
      </ul>

    </div>
  </>
}
