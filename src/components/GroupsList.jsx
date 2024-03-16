import React from 'react';

export default function GroupsList({groups},{selectGroup}) {
  return (
    <ul>{groups.map((group)=>{
      <li key={group.name} style={{color: group.color}}
      onClick={()=> selectGroup(group.name)}>
        {group.name}
      </li>
    })}</ul>
  )
}
