import { Route, Routes as BaseRoutes } from "react-router-dom";
import { Shell } from "./shell";
import Settings from "./components/settingsView";

export default function Routes() {
  return (
    <BaseRoutes>
      <Route path="/" element={<Shell />} />
      <Route path="/settings">
        <Route index element={<Settings />} />
      </Route>
    </BaseRoutes>
  );
}