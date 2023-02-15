import {  doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService } from '../firebase';
import { useState } from 'react';

function Nweet({ nweetObj, isOwner }) {
    const [edit, setEdit] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const  NweetTextRef =  doc(dbService, "nweets", `${nweetObj.id}`);

    const onDeleteClick = async() => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (ok) {
            await deleteDoc(NweetTextRef);
        }
    };

    const toggleEduting = () => setEdit((prev => !prev));

    const onSubmit = async(e) => {
        e.preventDefault();
        await updateDoc(NweetTextRef, {
            text: newNweet,
            });
            setEdit((prev => !prev));
    }

    const onChange = (e) => {
        console.log(e);
        const {
            target: { value }
        } = e;
        setNewNweet(value);
    };
    
    return (
        <div>
            {edit ? (
                <>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="수정할 내용을 적어주세요" value={newNweet} onChange={onChange} />
                    <input type="submit" value="완료" />
                </form>
                <button onClick={toggleEduting}>취소</button>
                </>
            ) : (
                <>
                <h4>{nweetObj.text}</h4>
                {isOwner && (
                    <><button onClick={toggleEduting}>수정</button>
                    <button onClick={onDeleteClick}>X</button></>
                )}
                </>
            )}
        </div>
    );
}

export default Nweet;