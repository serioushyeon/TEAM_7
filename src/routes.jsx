import GlobalLayout from "./pages/_layout";
import TestPage from "./pages/TestPage";

export const routes = [
    {
        path: "/",
        element: <GlobalLayout />,
        children: [
            {path: "/", element: <TestPage />, index: true }, // <= 와 같은 형식으로 지정
        ],
    },
];

export const pages = [
    { route: "/"},
]