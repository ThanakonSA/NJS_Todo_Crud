"use client"; 
import './style.css';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useState } from 'react';

export default function Page() {
    const [refresh, setRefresh] = useState(false);

    return (
        <div>
            <h1>บันทึกงาน</h1>
            <TaskForm onTaskAdded={() => setRefresh(prev => !prev)} />
            <TaskList refresh={refresh} /> 
        </div>
    );
}