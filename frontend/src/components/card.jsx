import React from "react";
import poster from '../assets/avatar.jpg';
import "../styles/Card.css"

function Card({item, title, href, other, onClick}) {

    function renderStars(numStars) {
        let stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push(
                <svg key={i} width={other ? "20" : "24"} height={other ? "20" : "24"} viewBox="0 0 24 24" fill="#ffb300" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
                </svg>
            );
        }
        for (let i = numStars; i < 5; i++) {
            stars.push(
                <svg key={i} width={other ? "18" : "22"} height={other ? "18" : "22"} viewBox="0 0 24 26" fill="none" stroke="#ffb300" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
                </svg>
            );
        }
        return stars;
    }    

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10, marginTop: 100}}>
                <h3>{title}</h3>
                <h4>Ver mais</h4>
            </div>
            {item.map((item) => (
                <div key={item.id} className="card" onClick={() => onClick(item)}>
                    <img
                        style={other ? {width: 90, borderRadius: 3} : {width: 120, borderRadius: 3}}
                        src={poster}
                    />
                    { other ?
                        <div style={{minWidth: 250, maxWidth: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                            <div>
                                <h3>{item.name}</h3>
                                <small>{item.author}</small>
                            </div>
                            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2>{renderStars(item.average_stars)}</h2>
                                <div style={{ display: 'flex', alignItems: 'center', background: '#e0e0e0', padding: 3, borderRadius: 4, gap: 5, paddingLeft: 7, paddingRight: 7 }}>
                                    <p style={{fontWeight: 600}}>{item.comments_count}</p>
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 9H17M7 13H12M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" stroke="#000000" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                </div>
                            </div>
                        </div>
                        :
                        <div style={{width: '100%'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <h2>{item.name}</h2>
                                <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
                                    <h2>{renderStars(item.average_stars)}</h2>
                                    <div style={{ display: 'flex', alignItems: 'center', background: '#e0e0e0', padding: 3, borderRadius: 4, gap: 5, paddingLeft: 7, paddingRight: 7 }}>
                                        <p style={{fontWeight: 600}}>{item.comments_count}</p>
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 9H17M7 13H12M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" stroke="#000000" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    </div>
                                </div>
                            </div>
                            <small>{item.author} • {item.movie_created}</small>
                            <br />
                            <br />
                            <p>{item.description}</p>
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}

export default Card;