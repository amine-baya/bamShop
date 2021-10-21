import React from 'react'


const Rating = ({ value, text, color, ratingHandallor}) => {
    return (
        
        <div className='rating' onClick={ ratingHandallor}>
            <span>
                <i style={{ color: color }} id="1"
                 className={
                  value >=1 
                    ? 'fas fa-star' 
                    : value >= 0.5  
                    ? 'fas fa-star-half-alt' 
                    : 'far fa-star'
                    }>
                </i>
            </span>
            <span>
                <i style={{ color: color }} id="2"
                 className={
                  value >=2 
                    ? 'fas fa-star' 
                    : value >= 1.5 
                    ? 'fas fa-star-half-alt' 
                    : 'far fa-star'
                    }>
                </i>
            </span> 
            <span>
                <i style={{ color: color }} id="3"
                 className={
                  value >=3
                    ? 'fas fa-star' 
                    : value >= 2.5 
                    ? 'fas fa-star-half-alt' 
                    : 'far fa-star'
                    }>
                </i>
            </span>
            <span>
                <i style={{ color: color }} id="4"
                 className={
                  value >=4
                    ? 'fas fa-star' 
                    : value >= 3.5 
                    ? 'fas fa-star-half-alt' 
                    : 'far fa-star'
                    }>
                </i>
            </span>
            <span>
                <i style={{ color: color }} id="5"
                 className={
                  value >=5 
                    ? 'fas fa-star' 
                    : value >= 4.5 
                    ? 'fas fa-star-half-alt' 
                    : 'far fa-star'
                    }>
                </i>
            </span>
           
            <span>{text && text}</span>
        </div>
    )
}


Rating.defaultProps = {
    color : 'gold'
}

export default Rating

