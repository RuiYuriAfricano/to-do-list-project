import { useState } from 'react'
import NavBar from "./components/NavBar";
import TodoApp from "./components/TodoApp";
import Footer from "./components/Footer";

function App() {
  const [dark, setDark] = useState(true)

  return (
    <>
      <div className={dark ? '' : "light"}>
        <NavBar dark={dark} setDark={setDark} />
        <TodoApp />
        <Footer />
      </div>
    </>
  )
}

export default App;
