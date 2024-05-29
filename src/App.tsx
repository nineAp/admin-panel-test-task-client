import React, { useEffect, useState } from "react";
import NavigationMenu from "./Components/NavigationMenu";
import getDialogs, { IDialog } from "./services/getDialogs";
import DialogTable from "./Components/DialogTable";
import ChatChart from "./Components/ChatChart";

function App() {
  const [dialogs, setDialogs] = useState<IDialog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const getData = async () => {
    const dialogsData: Array<IDialog> | undefined = await getDialogs();
    if (dialogsData) {
      setDialogs(dialogsData);
      setLoading(false);
      return;
    }
    setError(true);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <NavigationMenu></NavigationMenu>
      <div className="content">
        <div className="title">
          <h1>Статистика диалогов</h1>
          <p>
            На этой странице вы можете отслеживать статистику диалогов... Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Fuga harum
            voluptates consequatur debitis fugiat reprehenderit minus omnis amet
            temporibus qui quis quas, ullam beatae veniam impedit aut recusandae
            tempore. Numquam!
          </p>
        </div>
        <div className="dialogs_data">
          {loading && <h1>Загрузка...</h1>}
          {!loading && !error && (
            <>
              <DialogTable dialogs={dialogs}></DialogTable>
              <ChatChart dialogs={dialogs}></ChatChart>
            </>
          )}
          {error && <h1>Ошибка при загрузке данных</h1>}
        </div>
      </div>
    </div>
  );
}

export default App;
