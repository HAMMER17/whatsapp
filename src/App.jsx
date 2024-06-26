import { useEffect } from "react";
import Chat from "./components/chat/Chat"
import Detail from "./components/detail/Detail"
import List from "./components/list/List"
import Login from "./log/Login"
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/store";
import { useChatStore } from "./lib/chat";


function App() {
  const { currentUser, fetchUserStore } = useUserStore()
  const { chatId } = useChatStore()

  useEffect(() => {
    const unSab = onAuthStateChanged(auth, (user) => {
      fetchUserStore(user?.uid)
    })
    return () => unSab();
  }, [fetchUserStore])
  return (
    <div className="container">
      {currentUser ? <>
        <List />
        {chatId && <Chat />}
        {chatId && <Detail />}
      </> : <Login />}
      <ToastContainer />
    </div>
  )
}

export default App
