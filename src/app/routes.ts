import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import AnalyzePage from "./pages/AnalyzePage";
import ResultsPage from "./pages/ResultsPage";
import HistoryPage from "./pages/HistoryPage";
import RootLayout from "./components/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "analyze", Component: AnalyzePage },
      { path: "results", Component: ResultsPage },
      { path: "history", Component: HistoryPage },
    ],
  },
]);
