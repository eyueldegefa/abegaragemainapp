import React from 'react'
import UnauthorizedImage from '../../assets/images/pages/UnAuthorized.png'

function Unauthorized() {
  return (
    <div>
      <div className='unAuthorized-image'>
        <img src={UnauthorizedImage} alt="unauthorized page" />
      </div>
    </div>
  )
}

export default Unauthorized