import React from "react";
import styles from "./MostVisitedAddressForm.module.css";
import {ReactComponent as LocationIcon} from "@assets/svg/CallReceipt/location.svg";

const MostVisitedAddressForm: React.FC = () => {
    return <form className={styles["most-visited-address-form"]}>
        <div className={styles["form-heading"]}>
            <span className={styles["title"]}>
                Địa chỉ đi nhiều nhất
            </span>
        </div>
        <table className={styles["table-list"]}>
            <thead className = {styles["table-heading"]}>
                <tr>
                    <th>
                        <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <span style = {{lineHeight: "1em", fontSize: "1.8rem"}}>
                                Địa chỉ
                            </span>
                            <span className={styles["address-icn"]}>
                                <LocationIcon style = {{fontSize: "2.4rem", marginLeft: "1rem"}}/>
                            </span>
                        </div>
                    </th>  
                    <th style = {{fontSize: "1.8rem"}}>Lượt đi</th>
                </tr>
            </thead>
            <tbody>
                <tr style = {{backgroundColor: "#FBF9FA", cursor: "pointer"}}>
                    <td>
                        <div style = {{display: "flex", gap: "1rem", marginTop: '0.3rem'}}>
                            <span>
                                <LocationIcon style = {{fontSize: "2rem"}}/>
                            </span>
                            <span style = {{fontSize: "1.7rem"}}>
                              22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh
                            </span>
                        </div>
                    </td>
                    <td style = {{fontSize: "1.7rem", color: "#F86C1D", fontWeight: "600"}}>5 lần</td>
                </tr>

                <tr style = {{backgroundColor: "#FBF9FA", cursor: "pointer"}}>
                    <td>
                        <div style = {{display: "flex", gap: "1rem", marginTop: '0.3rem'}}>
                            <span>
                                <LocationIcon style = {{fontSize: "2rem"}}/>
                            </span>
                            <span style = {{fontSize: "1.7rem"}}>
                              22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh
                            </span>
                        </div>
                    </td>
                    <td style = {{fontSize: "1.7rem", color: "#F86C1D", fontWeight: "600"}}>5 lần</td>
                </tr>

                <tr style = {{backgroundColor: "#FBF9FA", cursor: "pointer"}}>
                    <td>
                        <div style = {{display: "flex", gap: "1rem", marginTop: '0.3rem'}}>
                            <span>
                                <LocationIcon style = {{fontSize: "2rem"}}/>
                            </span>
                            <span style = {{fontSize: "1.7rem"}}>
                              22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh
                            </span>
                        </div>
                    </td>
                    <td style = {{fontSize: "1.7rem", color: "#F86C1D", fontWeight: "600"}}>5 lần</td>
                </tr>

                <tr style = {{backgroundColor: "#FBF9FA", cursor: "pointer"}}>
                    <td>
                        <div style = {{display: "flex", gap: "1rem", marginTop: '0.3rem'}}>
                            <span>
                                <LocationIcon style = {{fontSize: "2rem"}}/>
                            </span>
                            <span style = {{fontSize: "1.7rem"}}>
                              22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh
                            </span>
                        </div>
                    </td>
                    <td style = {{fontSize: "1.7rem", color: "#F86C1D", fontWeight: "600"}}>5 lần</td>
                </tr>

                <tr style = {{backgroundColor: "#FBF9FA", cursor: "pointer"}}>
                    <td>
                        <div style = {{display: "flex", gap: "1rem", marginTop: '0.3rem'}}>
                            <span>
                                <LocationIcon style = {{fontSize: "2rem"}}/>
                            </span>
                            <span style = {{fontSize: "1.7rem"}}>
                              22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh
                            </span>
                        </div>
                    </td>
                    <td style = {{fontSize: "1.7rem", color: "#F86C1D", fontWeight: "600"}}>5 lần</td>
                </tr>
            </tbody>    
        </table>
        
    </form>
}

export default MostVisitedAddressForm;