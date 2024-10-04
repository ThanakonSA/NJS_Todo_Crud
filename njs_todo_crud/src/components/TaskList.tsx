"use client"; 

import { useEffect, useState } from 'react';

interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    dueDate: string;
}

const TaskList: React.FC<{ refresh: boolean }> = ({ refresh }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string>('');

    const fetchTasks = async () => {
        try {
            const res = await fetch('/api/tasks');
            if (!res.ok) {
                throw new Error('ไม่สามารถดึงข้อมูลได้');
            }
            const data = await res.json();
            setTasks(data.tasks || []);
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const updateTaskStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'เสร็จ' ? 'ยังไม่เสร็จ' : 'เสร็จ';

        const res = await fetch('/api/tasks', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, status: newStatus }),
        });

        if (res.ok) {
            fetchTasks(); 
        } else {
            const errorData = await res.json();
            console.error("Failed to update task:", errorData);
        }
    };

    const deleteTask = async (id: string) => {
        const res = await fetch('/api/tasks', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        if (res.ok) {
            fetchTasks(); 
        } else {
            const errorData = await res.json();
            console.error("Failed to delete task:", errorData);
        }
    };

    useEffect(() => {
        fetchTasks(); 
    }, [refresh]);

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <li key={task._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className={task.status === 'เสร็จ' ? 'strikethrough' : ''}>
                                <strong style={{ color: 'black' }}>{task.title}</strong>: <span style={{ color: 'black' }}>{task.description}</span>
                            </div>
                            <span className="status" style={{ color: 'black', width: '100px', textAlign: 'center' }}>{task.status}</span>
                            <div>
                                <button onClick={() => updateTaskStatus(task._id, task.status)}>
                                    {task.status === 'เสร็จ' ? 'กลับไปยังไม่เสร็จ' : 'ทำเสร็จ'}
                                </button>
                                <button onClick={() => deleteTask(task._id)}>ลบ</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>ไม่มีงานในระบบ</li>
                )}
            </ul>
        </div>
    );
};

export default TaskList;