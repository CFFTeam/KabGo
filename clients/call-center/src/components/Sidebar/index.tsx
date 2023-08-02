import styles from "./sidebar.module.css";

const Sidebar: React.FC = () => {
    return <div className={styles["sidebar"]}>
        <ul>
            <h1>
                THIS IS SIDEBAR  
            </h1>
            <li><a href="">Sidebar-1</a></li>
            <li><a href="">Sidebar-1</a></li>
            <li><a href="">Sidebar-1</a></li>
            <li><a href="">Sidebar-1</a></li>
            <li><a href="">Sidebar-1</a></li>
        </ul>
    </div>
}

export default Sidebar;