import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ToDoList from "./pages/ToDoList";
import Reminder from "./pages/Reminder";
import Calender from "./pages/Calender";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="task" element={<ToDoList />} />
          <Route path="reminder" element={<Reminder />} />
          <Route path="calender" element={<Calender />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
