import { useHistory } from 'react-router-dom';
import { authService } from './../firebase';

function Profile() {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }
    
    return (
        <div>
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    );
}

export default Profile;