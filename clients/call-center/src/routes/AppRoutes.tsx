import { Routes, Route } from "react-router-dom";
import BaseLayout from "@layouts/BaseLayout";
import CallReceiptHandlerLayout from "@layouts/CallReceiptHandlerLayout/CallReceiptHandlerLayout";
import CallReceiptPage from "@pages/CallReceiptPage/CallReceiptPage";
import CallReceiptHandlerPage from "@pages/CallReceiptHandlerPage/CallReceiptHandlerPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<CallReceiptHandlerLayout />}>
                <Route path="/" element={<CallReceiptHandlerPage/>} />
            </Route>
            <Route path="/call-receipt" element={<CallReceiptPage/>} />
            <Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
