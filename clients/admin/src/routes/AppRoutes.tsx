import { Routes, Route } from "react-router-dom";
import BaseLayout from "@layouts/BaseLayout";
import Dashboard from "@components/Dashboard";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route element={<BaseLayout />}>
                <Route path="/" element={<Dashboard />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
