"use client"; 

import { useState } from 'react';

interface TaskFormProps {
    onTaskAdded: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('ยังไม่เสร็จ');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTask = { title, description, status, dueDate };

        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        });

        if (res.ok) {
            onTaskAdded();
            setTitle('');
            setDescription('');
            setStatus('ยังไม่เสร็จ');
            setDueDate('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="ชื่องาน" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="รายละเอียดงาน" required />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="ยังไม่เสร็จ">ยังไม่เสร็จ</option>
                <option value="เสร็จ">เสร็จแล้ว</option>
            </select>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            <button type="submit">สร้างงาน</button>
        </form>
    );
};

export default TaskForm;