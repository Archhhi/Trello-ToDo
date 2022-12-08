import React from 'react'
import s from './styles.module.css'
import { useNavigate } from 'react-router-dom'

const Projects = () => {
  const navigate = useNavigate()

  return (
    <div className={s.mainWrapper}>
      <div className={s.projectsWrapper}>
        <div className={s.project} onClick={() => navigate('/tasks')}>
          <span>CRM</span>
        </div>
      </div>
    </div>
  )
}

export default Projects
