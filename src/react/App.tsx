import React, { useEffect, useState } from "react";
import { requestAppInfo, AppInfo } from "./communication";
import "./App.css";
import { People } from "./features/people/People";

export const App = () => {
  const [appInfo, setAppInfo] = useState<AppInfo | undefined>();

  useEffect(() => {
    requestAppInfo().then(setAppInfo);
  }, []);

  const header = appInfo
    ? `${appInfo.appName} version ${appInfo.appVersion}`
    : "Loading ...";

  return (
    <div className="App">
      <header className="App-header">{header}</header>
      <People />
    </div>
  );
};
