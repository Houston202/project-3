import '../styles/main.css';
import '../styles/fonts.css';
import levelup from '../images/level_up_purple.svg';
import {Link} from 'react-router-dom';
import SignInUpButtons from '../components/SignInUpButtons';
import SignedInButton from '../components/SignedInButton';
import UserProfile from './UserProfile';
import CustomerProfile from './CustomerProfile';
import MainContentNotSigned from '../components/MainContentNotSigned';
import MainContentSigned from '../components/MainContentSigned';
import { useState } from 'react';
import CreateProject from './CreateProject';

const Main = ({isSignedIn, userData}) => {


    const [showProfile, setShowProfile] = useState(false)
    const [createProject, setCreateProject] = useState(false)

    if (showProfile && userData.companyName === '') {
        return <UserProfile setShowProfile={setShowProfile} userData={userData} />
    }
    else if (showProfile && userData.companyName !== '') {
        return <CustomerProfile setShowProfile={setShowProfile} userData={userData} />
    }
    else if (createProject) {
        return <CreateProject companyName={userData.companyName} accessToken={userData.accessToken} setCreateProject={setCreateProject} />
    }
    else {
    return (
        <>
            <div className="main_header">
                <div className="main_header__section">
                    <Link to='/'>
                        <div className="main_headerlogo">
                            <img src={levelup} alt="" />
                        </div>
                    </Link> 
                </div>
                <div className="main_header__section">
                    {userData.companyName !== '' ? <button onClick={()=>setCreateProject(true)} className="main_header__item main_fill" style={{cursor: 'pointer', marginRight: '20px'}}>Создать проект</button> : <></>}
                    {isSignedIn ? <SignedInButton setShowProfile={setShowProfile} /> : <SignInUpButtons />}
                </div>
            </div>
            {isSignedIn ? <MainContentSigned /> : <MainContentNotSigned />}
        </>
    );
    }
}

export default Main;