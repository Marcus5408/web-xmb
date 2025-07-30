import './App.css'
// import { ModeToggle } from './components/mode-toggle'
import { XMBContainer, XMBPrimaryMenu, XMBMenuCategory, XMBMenuItem } from './components/web-xmb'

function App() {

  return (
    <>
      {/* <ModeToggle /> */}
      {/* XMB Example */}
      <XMBContainer className='w-100'>
        <XMBPrimaryMenu>
          <XMBMenuCategory title="Games">
            {
              Array.from({ length: 5 }, (_, i) => (
                <XMBMenuItem index={i} title={`Game ${i + 1}`} icon={`Gamepad2`} />
              ))
            }
          </XMBMenuCategory>
          <XMBMenuCategory title="Videos">
                        {
              Array.from({ length: 5 }, (_, i) => (
                <XMBMenuItem index={i} title={`Video ${i + 1}`} icon={`square-play`} />
              ))
            }
          </XMBMenuCategory>
        </XMBPrimaryMenu>
      </XMBContainer>
    </>
  )
}

export default App
