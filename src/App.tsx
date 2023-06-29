import { Box } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./features/dashboard";
import ModalContainer from "./components/Modal/modalContainer";
import ToastManager from "./features/ToastManager/ToastManager.lazy";

export const App = () => (
  <Box textAlign="center" minH="100vh" p={3} fontSize="xl">
    <ColorModeSwitcher justifySelf="flex-end" />
    <Routes>
      <Route path="/">
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
    <ModalContainer />
    <ToastManager />
  </Box>
);