import React, { useCallback, useState } from "react";
import "./App.css";
import FinishPage from "./Components/FinishPage/FinishPage";
import LeftBarContent from "./Components/LeftBarContent/LeftBarContent";
import Registration from "./Components/Registratioin/Registration";
import RightBarContent from "./Components/RightBarContent/RightBarContent";
import PageContext from "./Context/PageContext";

export type Page = "landing" | "registration" | "finish";

function App(): JSX.Element {
  const [page, setPage] = useState<Page>("landing");

  const changeStep = useCallback((newPage: Page) => {
    setPage(newPage);
  }, []);

  return (
    <main className="EmptyMain">
      <video
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
        autoPlay
        muted
        loop
      ></video>

      {page === "landing" && (
        <>
          <aside className="emptyLeftAsideBar"></aside>
          <aside className="emptyRightAsideBar">
            <Registration goBack={changeStep} />
          </aside>
        </>
      )}

      {page === "registration" && (
        <>
          <aside className="leftAsideBar">
            <PageContext.Provider value={changeStep}>
              <LeftBarContent />
            </PageContext.Provider>
          </aside>
          <aside className="rightAsideBar">
            <RightBarContent goBack={changeStep} />
          </aside>
        </>
      )}

      {page === "finish" && (
        <>
          <aside className="leftAsideBar Final">
            <FinishPage />
          </aside>
          <aside className="rightAsideBar">
            <RightBarContent goBack={changeStep} />
          </aside>
        </>
      )}
    </main>
  );
}

export default App;
