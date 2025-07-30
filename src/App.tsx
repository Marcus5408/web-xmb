import "./App.css";
// import { ModeToggle } from './components/mode-toggle'
import {
  XMB,
  XMBMenu,
  XMBCategory,
  XMBCategoryTitle,
  XMBCategoryContent,
  XMBMenuItem,
} from "./components/web-xmb";
import { Gamepad2, PlaySquare, Music } from "lucide-react";

function App() {
  return (
    <>
      {/* <ModeToggle /> */}
      {/* XMB Example */}
      <XMB className="w-100">
        <XMBMenu>
          <XMBCategory title="Games">
            <XMBCategoryTitle>
              <Gamepad2 />
              Games
            </XMBCategoryTitle>
            <XMBCategoryContent>
              {Array.from({ length: 7 }, (_, i) => (
                <XMBMenuItem
                  index={i}
                  title={`Game ${i + 1}`}
                  icon={`Gamepad2`}
                />
              ))}
            </XMBCategoryContent>
          </XMBCategory>
          <XMBCategory title="Videos">
            <XMBCategoryTitle>
              <PlaySquare />
              Videos
            </XMBCategoryTitle>
            <XMBCategoryContent>
              {Array.from({ length: 3 }, (_, i) => (
                <XMBMenuItem
                  index={i}
                  title={`Video ${i + 1}`}
                  icon={`square-play`}
                />
              ))}
            </XMBCategoryContent>
          </XMBCategory>
          <XMBCategory title="Music">
            <XMBCategoryTitle>
              <Music />
              Music
            </XMBCategoryTitle>
            <XMBCategoryContent>
              {Array.from({ length: 5 }, (_, i) => (
                <XMBMenuItem
                  index={i}
                  title={`Music ${i + 1}`}
                  icon={`music`}
                />
              ))}
            </XMBCategoryContent>
          </XMBCategory>
        </XMBMenu>
      </XMB>
    </>
  );
}

export default App;
