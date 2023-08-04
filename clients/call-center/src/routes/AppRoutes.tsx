import { Routes, Route } from "react-router-dom";
import BaseLayout from "@layouts/BaseLayout";
import CallReceiptHandlerLayout from "@layouts/CallReceiptHandlerLayout/CallReceiptHandlerLayout";
import CallReceiptPage from "@pages/CallReceiptPage/CallReceiptPage";
import CallReceiptHandlerPage from "@pages/CallReceiptHandlerPage/CallReceiptHandlerPage";
import BookingPage from "@pages/BookingPage/BookingPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<CallReceiptHandlerLayout />}>
                <Route path="/" element={<CallReceiptHandlerPage/>} />
                <Route path="/call-receipt-handle" element={<CallReceiptHandlerPage/>} />
                <Route path = "/booking-page" element = {<BookingPage/>}/>
            </Route>
            <Route path="/call-receipt" element={<CallReceiptPage/>} />
            <Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
