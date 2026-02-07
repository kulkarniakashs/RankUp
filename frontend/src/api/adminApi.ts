import type React from 'react';
import {http} from './http';

export async function approve(courseId : string, setVisible : React.Dispatch<React.SetStateAction<Boolean>>){
    try {
        await http.post(`/courses/${courseId}/approve`);
        setVisible(false);
    } catch (error) {
        alert(error);
    }
}

export async function reject(courseId : string, setVisible : React.Dispatch<React.SetStateAction<Boolean>>){
    try {
         await http.post(`/courses/${courseId}/approve`);
        setVisible(false);
    } catch (error) {
        alert(error);
    }
}