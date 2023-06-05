import React from 'react';
import '../style.css'
function Home() {
    return (
        <div>
            <div style={{maxWidth: '960px'}}><img className='Event_banner' src='https://slaimuda.github.io/ectl/static/media/confluence-of-nothingness.827775f871c90c68fa4a.jpg'/></div>
            <div>
                23.06.08 - 23.06.29<br/>
                <p style={{color:'gray',margin:'10px 0px 0px 0px'}}>이벤트 종료까지</p>
                <h1 style={{margin:'0px'}}><span>222:05:14</span></h1>
            </div>
            <div style={{textAlign:'center'}}>
                <a style={{display:'inline-block'}} href='https://www.facebook.com/AzurLaneEN/'>
                    <img src='https://webusstatic.yo-star.com/blhx_us_web/pc/static/facebook.27e4d4f.png'/>
                    <div>facebook</div>
                </a>
                <a style={{display:'inline-block'}} href='https://twitter.com/AzurLane_EN'>
                    <img src='https://webusstatic.yo-star.com/blhx_us_web/pc/static/twitter.6caf6e4.png'/>
                    <div>twitter</div>
                </a>
                <a style={{display:'inline-block'}} href='https://www.reddit.com/r/AzureLane/'>
                    <img src='https://webusstatic.yo-star.com/blhx_us_web/pc/static/reddit.bac8443.png'/>
                    <div>reddit</div>
                </a>
                <a style={{display:'inline-block'}} href='https://www.twitch.tv/directory/game/Azur%20Lane'>
                    <img src='https://webusstatic.yo-star.com/blhx_us_web/pc/static/twitch.5a9fa90.png'/>
                    <div>twitch</div>
                </a>
                <a style={{display:'inline-block'}} href='https://discord.com/invite/WYjqf7P'>
                    <img src='https://webusstatic.yo-star.com/blhx_us_web/pc/static/discord.073477f.png'/>
                    <div>discord</div>
                </a>
                <a style={{display:'inline-block'}} href='https://www.youtube.com/channel/UCPeJaqP6WgxUVDcpYkXZKMQ'>
                    <img src='https://webusstatic.yo-star.com/blhx_us_web/pc/static/youtube.88682fe.png'/>
                    <div>youtube</div>
                </a>
                <a style={{display:'inline-block'}} href='https://www.instagram.com/azurlane_official/'>
                    <img src='https://webusstatic.yo-star.com/blhx_us_web/pc/static/instagram.84b2f14.png'/>
                    <div>instargram</div>
                </a>
            </div>
        </div>
    ); }
export default Home;