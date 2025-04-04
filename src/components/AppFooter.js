import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        HACKERULERS
        
        <span className="ms-1">&copy; 2025 CHARUSAT.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://www.odoo.com/" target="_blank" rel="noopener noreferrer">
          ODOO
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
