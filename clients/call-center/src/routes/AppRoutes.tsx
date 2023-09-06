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
                <Route path = "/booking-page/:phoneNumber" element = {<BookingPage/>}/>
                <Route path = "/dashboard" element = {<CallReceiptHandlerPage/>}/>
                <Route path = "/statistic" element = {<CallReceiptHandlerPage/>}/>
                <Route path = "/report" element = {<CallReceiptHandlerPage/>}/>
                <Route path = "/team-member" element = {<CallReceiptHandlerPage/>}/>
                <Route path = "/feedback" element = {<CallReceiptHandlerPage/>}/>
                <Route path = "/contact" element = {<CallReceiptHandlerPage/>}/>
            </Route>
            <Route path="/call-receipt" element={<CallReceiptPage/>} />
            <Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
