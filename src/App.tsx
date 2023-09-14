import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from "./components/header/header.tsx";
import FileUpload from "./components/file-upload/file-upload.tsx";
import Sidebar from "./components/sidebar/sidebar.tsx";
import Tag from "./components/tag/tag.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header main={"sound2assets"}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed <br /> diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua.
      </Header>
      <FileUpload />
      <Sidebar/>
      <Tag>today</Tag>
    </>
  )
}

export default App
