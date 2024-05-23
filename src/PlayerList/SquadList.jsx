import teamALogo from '../assets/logo.jpeg';
import teamBLogo from '../assets/logob.jpeg';
import vsLogo from '../assets/vsimage.jpeg';
import { useLocation } from 'react-router-dom';

const SquadList = () => {


    const Members = useLocation();

    console.log(Members);
    const teamAMember = Members.state.teamA.slice().sort((a, b) => b.name.localeCompare(a.name));
    const teamBMember = Members.state.teamB.slice().sort((a, b) => a.name.localeCompare(b.name));
    const Impact = Members.state.impact;
    return (
        <div className='container'>
            <div className='impBox'>
                <div className='overBox'>


                    <div className='box'>
                        <img className="img" src={teamALogo} alt="Team A" />
                        <h4 className='teamNameA'>TEAM A</h4>
                        {
                            teamAMember.map((item) => {
                                return (
                                    <>

                                        <div key={item.id} className="teamA" >
                                            <p style={{ marginTop: "0.2rem" }}>{item.name}</p>
                                        </div>
                                    </>

                                )
                            })
                        }
                    </div>
                    <div>
                        <img className="vsimg" src={vsLogo} alt="Team VS" />
                    </div>
                    <div className='box'>

                        <img className="img" src={teamBLogo} alt="Team B" />
                        <h4 className='teamNameB'>TEAM B</h4>
                        {
                            teamBMember.map((item) => {
                                return (
                                    <>

                                        <div className="teamB"

                                        >

                                            <p style={{ marginTop: "0.2rem" }}>{item.name}</p>

                                        </div >
                                    </>

                                )
                            })
                        }
                    </div>

                </div>
                {Impact && Impact.map((item) => {
                    return (
                        <>

                            <div className='ImpaBox'>
                                <span>IMPACT PLAYER :
                                    <span style={{ color: 'black' }}> {item.name}</span></span>
                            </div>
                        </>

                    )
                })
                }
            </div>
        </div>
    );
};

export default SquadList;
