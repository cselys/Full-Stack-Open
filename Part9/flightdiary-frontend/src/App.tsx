import { useState, useEffect } from 'react';
import DiaryEntry, {NewDiaryEntry} from './types';
import Diary from './components/Diary';
import Diaryform from './components/Diaryform';
import Notification from './components/Notification';
import { getAllDiaries, createDiary } from './diaryService';
import { useDispatch } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { AppDispatch } from './store';
import axios from 'axios';

function App() {
  const [diary, setDiary] = useState<DiaryEntry[]>([]);

  const dispatch = useDispatch<AppDispatch>()

  useEffect(()=>{
    getAllDiaries().then(data =>{setDiary(data)})
    },[]);

  if(diary.length === 0 ) {
    return null;
  }

  const addDiary =  async (entry:NewDiaryEntry) => {
    try{
      const result = await createDiary(entry);
      if(result){
        setDiary((prevDiary) => [...prevDiary, result]); 
        dispatch(setNotification(`a new diary is added`,3));
      }
    }catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setNotification( error.response? error.response.data:'axios error',3));
      } else {
        dispatch(setNotification(error instanceof Error ?error.message:'error while adding diary',3));
      }
    }
  };

  return (
      <div>
        <h2>Add new entry</h2> 
        <Notification/>       
        <Diaryform addDiary={addDiary}/>
        <h2>Diary entries</h2>
        {diary.map(entry => <Diary key={entry.id} diary={entry}/>)}
      </div>
  )
}

export default App
