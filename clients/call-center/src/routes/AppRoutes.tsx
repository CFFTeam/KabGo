import { Routes, Route } from "react-router-dom";
import BaseLayout from "@layouts/BaseLayout";
import CallReceiptPage from "@pages/CallReceiptPage/CallReceiptPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<BaseLayout />}>
                <Route path="/" element={<p>HELLO WORLD</p>} />
            </Route>
            <Route path="/call-receipt" element={<CallReceiptPage/>} />
            <Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
