import React from 'react'
import noProjectImage from "../assets/no-projects.png"
import Button from './Button'
const NoProjectSelected = ({onStartAddProject}) => {
  return (
    <div className='w-2/3 text-center mt-24'>
        <img src={noProjectImage} alt='An empty task list' className='w-16 h-16 object-contain mx-auto'/>
        <h2 className="text-xl font-bold text-stone-500 my-4">No project selected</h2>
        <p className="text-stone-400 mb-4">Select a project or get started with a new one</p>
        <p>
            <Button onClick={onStartAddProject}>Create new project</Button>
        </p>
    </div>
  )
}

export default NoProjectSelected