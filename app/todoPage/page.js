'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../utils/firebase/firebase';
import NavBar from '../components/NavBar';
import CustomContainer from '../components/CustomContainer';
import AddTodoInput from '../components/AddTodoInput';
import TodoList from '../components/TodoList';
import Button from '../components/Button';


const TodoPage = ({ initialVal }) => {
  const [todos, setTodos] = useState(initialVal?.todos || []);
  

  useEffect(() => {
    // adopted firebase realtime update for changes made -- so manual update is not used
  const unsubscribeAuth = auth.onAuthStateChanged((user) => {
    if (!user) {
      console.log('No user authenticated');
      setTodos([]); 
      return;
    }

    console.log('User ID:', user.uid);
    const unsubscribeSnapshot = onSnapshot(
      collection(db, 'users', user.uid, 'todos'),
      (snapshot) => {
        console.log('Snapshot received, docs:', snapshot.docs.length);
        const updatedTodos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Updated todos:', updatedTodos);
        setTodos(updatedTodos);
      },
      (error) => {
        console.error('Error listening to todos:', error);
      }
    );

    // Return cleanup for snapshot listener
    return () => unsubscribeSnapshot();
  });

  // Return cleanup for auth listener
  return () => unsubscribeAuth();
}, []);

  return (
    <div className="h-[100vh] max-w-[100%]">
      <NavBar />
      <CustomContainer className="flex flex-col md:w-[60%] mx-auto h-auto p-5">
        <AddTodoInput />
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-lg font-semibold">Your Tasks</h2>
          <div className="flex gap-2 ml-auto">
            <Button>All</Button>
            <Button>Active</Button>
            <Button>Completed</Button>
          </div>
        </div>
        <TodoList todos={todos} />
      </CustomContainer>
    </div>
  );
};

export default TodoPage;