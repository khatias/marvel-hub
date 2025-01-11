import React from 'react'
import './CreatorList.css'
const CreatorList =({ creators })  =>{
    if (!creators || Object.keys(creators).length === 0) return <p>No creators available.</p>;
  return (
    <ul className="creators-list">
    {Object.entries(creators).map(([role, names], index) => (
      <li className="creators" key={index}>
        <span className="creators-role">{role}:</span>
        <span className="creator-name">{names.join(", ")}</span>
      </li>
    ))}
  </ul>
  )
}

export default CreatorList