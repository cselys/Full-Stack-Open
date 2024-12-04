import axios from 'axios';
import { NewDiaryEntry, DiaryEntry } from "./types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = async() => {
  return (await axios.get<DiaryEntry[]>(baseUrl)).data
}

export const createDiary = async(object: NewDiaryEntry) => {
  return (await axios
    .post<DiaryEntry>(baseUrl, object)).data
}