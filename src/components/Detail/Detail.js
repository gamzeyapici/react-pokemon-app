import React from 'react';

import './Detail.css';

function Detail({ item }) {
    if (item) {
        return <div className="pokemon-detail">
            <div className="row">
                <div className="col"> <img src={item.imageUrl} /></div>
                <div className="col text-left">
                    <div><b>İsim:</b> {item.name}</div>
                    <div><b>Süper Tip:</b> {item.supertype}</div>
                    <div><b>Evrim:</b> {item.evolvesFrom}</div>
                    <div><b>HP:</b> {item.hp}</div>
                    <div><b>Enderlik:</b> {item.rarity}</div>
                    {item.attacks ?  <div>
                        <b> Saldırılar:</b>
                        <hr />
                        <div>{item.attacks.map((item, i) => <div key={i}>
                            <span><b>{item.name}: </b></span>
                            <span><b>{item.damage} saldırı</b></span>
                        </div>)}
                        </div>
                    </div> : ''}
                </div>
            </div>
        </div>
    } else {
        return null;
    }
}

export default Detail;
