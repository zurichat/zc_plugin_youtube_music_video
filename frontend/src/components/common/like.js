//Kit from font awesome icon
/*<script src="https://kit.fontawesome.com/6fc1396fe8.js" crossorigin="anonymous"></script>

//Style for like icon
.far{
  width: 20px;
  height: 20px;
  cursor: pointer;
  user-select: none;
}

.far:hover {
  color: #4ECB71;
}*/

//html for heart/likes icon

/* <i class='far fa-heart'></i>; */

import React, { useState } from 'react';

const Like = () => {
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };
  const styles = {
    heartLike: {
      color: '#4ECB71',
      height: '20px',
      width: '20px',
      cursor: 'pointer',
    },
    emptyHeart: {
      height: '20px',
      width: '20px',
      cursor: 'pointer',
    },
  };

  return (
    <div>
      {like ? (
        <i
          className='fas fa-heart'
          style={styles.heartLike}
          onClick={handleLike}
        ></i>
      ) : (
        <i
          className='far fa-heart'
          style={styles.emptyHeart}
          onClick={handleLike}
        ></i>
      )}
    </div>
  );
};

export default Like;
