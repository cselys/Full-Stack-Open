import { useState } from "react";
import { Visibility, Weather,NewDiaryEntry } from "../types";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { setNotification } from '../reducers/notificationReducer';

interface DiaryformProps {
    addDiary(entry:NewDiaryEntry) : Promise<void>;
}

const Diaryform = ({addDiary}: DiaryformProps) => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
    const [weather, setWeather] = useState<Weather>(Weather.Sunny);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = (event:React.SyntheticEvent) => {
        event.preventDefault();
        if(comment.length===0){
            dispatch(setNotification(`error:comments should not be empty`,3))
            return;
        }
        const entry: NewDiaryEntry = {
            date: date,
            visibility: visibility,
            weather: weather,
            comment: comment,
          };
        addDiary(entry);
        setDate('');
        setComment('');
    }

    return (<div>
        <div>
             date <input type='date' value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <form onSubmit={handleSubmit}>
            <div>
                <fieldset>
                    <legend>visibility:</legend>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {Object.values(Visibility).map(v => {
                        return (
                        <div key={v}>
                        <input style={{margin: '0.4rem'}} type="radio" checked={v===visibility}
                        id={v} name='visibility' value={v} onChange={() =>setVisibility(v)}/>
                        <label htmlFor={v}>{v}</label>
                        </div>
                        )}
                    )}
                    </div>
                </fieldset>
            </div>
            <div>
                <fieldset>
                    <legend>weather:</legend>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        {Object.values(Weather).map(v => {
                            return (
                            <div key={v}>
                            <input style={{margin: '0.4rem'}} type="radio" checked={v===weather}
                            id={v} name='Weather' value={v} onChange={() =>setWeather(v)}/>
                            <label htmlFor={v}>{v}</label>
                            </div>
                            )}
                        )}
                    </div>
                </fieldset>
            </div>
            <div>
                comment <input type='text' value={comment} onChange={(event) => setComment(event.target.value)} />
            </div>
            <div>
                <button type='submit'>add</button>
            </div>
        </form>
    </div>);
}

export default Diaryform