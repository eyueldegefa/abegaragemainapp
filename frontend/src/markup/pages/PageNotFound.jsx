import React from 'react'
import PageNotFoundImage from '../../assets/images/pages/PageNotFound.png'

function PageNotFound() {
  return (
    <div>
      <div className='unAuthorized-image'>
        <img src={PageNotFoundImage} alt="Page not found" />
      </div>
    </div>
  )
}

export default PageNotFound