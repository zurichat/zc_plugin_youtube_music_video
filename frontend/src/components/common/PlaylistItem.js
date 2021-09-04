import React from 'react'
import './playlistitem.css'
function PlaylistItem() {
return (

            <section className="playlist">
                <div className="container">
                    <img src="https://cdn.vanguardngr.com/wp-content/uploads/2020/05/Wizkid-e1588973158415.jpg" alt="album" />
                    <div className="playlistclass">
                        <h3>Essence (ft Tems) - Wizkid</h3>
                        <p>Added by smoothice</p>
                    </div>
                    <div className="para">
                        <p>4.05 mins</p>
                    </div>
                    <div className="paragraph">
                        <p>642 likes</p>
                    </div>
                    <div className="vector">
                        <img className="vector1" src="https://png.pngitem.com/pimgs/s/111-1119299_black-hollow-heart-icon-hd-png-download.png" alt="heart" />
                        <img className="vector2" src="https://img.flaticon.com/icons/png/512/17/17764.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF" alt="option" />
                    </div>
                </div>
            </section>
);
}

export default PlaylistItem
