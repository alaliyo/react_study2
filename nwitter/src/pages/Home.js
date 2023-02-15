import { useState, useEffect } from 'react';
import { addDoc, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { dbService } from '../firebase';
import Nweet from '../components/Nweet';

function Home({ userObj }) {
    
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    // Get
    useEffect(() => {
        const q = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
            );
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        console.log(nweetArr);
        setNweets(nweetArr);
            });
    }, [])

    // POST 입력
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            userId: userObj.uid,
            createdAt: Date.now(),
        });
        console.log(docRef.id);
        } catch (error) {
        }
        setNweet("");
    };

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNweet(value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} type="text" onChange={onChange} placeholder="당신의 생각을 적어주세요~" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((e) => (
                    <Nweet key={e.id} nweetObj={e} isOwner={e.userId === userObj.uid}/>
                ))}
            </div>
        </div>
    );
}

export default Home;