import React, {useState} from 'react'



const Like = () => {
    const [like,setLike] = useState(false)
    const handleLike = () =>{
        setLike(!like)
    }
    const styles = {
        heartLike:{
            color: '#4ECB71',
            height: '20px',
            width: '20px',
            left: '2.2890625px',
            top: '2px',
            borderRadius: '0px',
            cursor: 'pointer',
        
        },
        emptyHeart:{
            height: '20px',
            width: '20px',
            left: '2.2890625px',
            top: '2px',
            borderRadius: '0px',
            cursor: 'pointer',
        
        }
    }
       
      
    return (

        <div>
            {like?<i class="fas fa-heart" style={styles.heartLike} onClick={handleLike}></i>:<i class="far fa-heart"  style={styles.emptyHeart} onClick={handleLike} ></i>}
            
        </div>
    )
}

export default Like
