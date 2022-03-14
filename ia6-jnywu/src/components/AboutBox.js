import React from 'react';

class AboutBox extends React.Component {

    render() {
        return (
            <div id="aboutModal" className="modal" role="dialog">
                <div className="modal-content" style={{ background: '#fff' }}>
                    <div className="modal-header">
                        <center>
                            <h3 className="modal-title"><b>About SpeedScore</b>
                                <button id="modalClose" className="close"
                                    style={{
                                        border: '2px solid black',
                                        backgroundColor: 'black', color: 'white'
                                    }} onClick={() => this.props.closeAbout()}>
                                    &times;</button>
                            </h3>
                        </center>

                    </div>
                    <div className="modal-body">
                        <center>
                            <img
                                src="https://dl.dropboxusercontent.com/s/awuwr1vpuw1lkyl/SpeedScore4SplashLogo.png"
                                height="200" width="200"></img>
                            <h3>The World's First and Only Suite of Apps for Speedgolf</h3>
                            <p style={{ fontStyle: 'italic' }}>Version 5 (Live), Build 20.6.2018 &copy; 2017-20 The Professor of Speedgolf. All rights.
                    </p>
                        </center>
                        <p>SpeedScore apps support</p>
                        <ul>
                            <li>live touranment scoring (<i>SpeedScore Live&reg;</i>)</li>
                            <li>tracking personal speedgolf rounds and sharing results
                    (<i>SpeedScore Track&reg;</i>)</li>
                            <li>finding speedgolf-friendly courses, booking tee times, and
                    paying to play speedgolf by the minute (<i>SpeedScore
                    Play&reg;</i>)</li>
                        </ul>
                        <p>SpeedScore was first developed by Dr. Chris Hundhausen,
                        associate professor of computer science at Washington State
                    University and the <i>Professor of Speedgolf</i>, with support
                    from Scott Dawley, CEO of Speedgolf USA, LLC. It leverages
                    Google server-side technologies.</p>
                        <p>For more information on SpeedScore, visit <a
                            href="http://speedscore.live" target="_blank">SpeedScore's web
                    site</a>. For more information on speedgolf, visit <a
                                href="http://playspeedgolf.com"
                                target="_blank">playspeedgolf.com</a> and <a
                                    href="http://usaspeedgolf.com" target="_blank">Speedgolf
                    USA</a>.</p>
                    </div>
                    <div className="modal-footer">
                        <button id="aboutOK" className="close" style={{
                            border: '2px solid black', padding: '4px',
                            backgroundColor: 'black', color: 'white'
                        }} onClick={() => this.props.closeAbout()}>
                            OK</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutBox;