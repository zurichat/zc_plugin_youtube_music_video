import React from 'react';
import { v4 as uuid } from 'uuid';
import PlaylistHeader from './common/playlistHeader';
import PlaylistItem from './common/playlistItem';

function Playlist() {
  return (
    <div>
      <PlaylistHeader />
      <PlaylistItem
        songName='Essence - Wizkid ft Tems'
        addedBy='smoothIce'
        duration='4.05'
        likeNo='480'
        imgSrc='https://cdn.vanguardngr.com/wp-content/uploads/2020/05/Wizkid-e1588973158415.jpg'
        id={uuid()}
      />
      <PlaylistItem
        songName='Fair Trade - Drake'
        addedBy='dev1nh1o'
        duration='5'
        likeNo='80'
        imgSrc='https://i.ytimg.com/vi/THVbtGqEO1o/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBVZ9NFFPyEXDrQu4QwLD5m2qOR_w'
        id={uuid()}
      />
      <PlaylistItem
        songName='Bad Samaritan - Arya Star'
        addedBy='lilianada'
        duration='4'
        likeNo='50'
        imgSrc='https://i.ytimg.com/vi/zcR0PWGfUhs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBjCBkwMDne8vFiG-reGBK0ESf82w'
        id={uuid()}
      />
      <PlaylistItem
        songName='Championships II - Meek Mill'
        addedBy='dev1nh1o'
        duration='5.5'
        likeNo='40'
        imgSrc='https://i.ytimg.com/vi/sWlYdCutkLE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCpObyRhkW7tdqRR5f4iG1yr_ip2g'
        id={uuid()}
      />
      <PlaylistItem
        songName='Question - Burna Boy'
        addedBy='justice'
        duration='5'
        likeNo='10,000'
        imgSrc='https://i.ytimg.com/vi/0rOer3k2DWg/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA9nQuES1WzXC0EIHDmDCr-kvrzQw'
        id={uuid()}
      />
    </div>
  );
}

export default Playlist;
