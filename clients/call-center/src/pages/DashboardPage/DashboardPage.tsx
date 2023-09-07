import styles from "./DashboardPage.module.css";
import DashboardTable from "@components/DashboardHandler/Dashboard/Dashboard";
import Category from "@components/DashboardHandler/Category/Category";

const DashboardPage: React.FC = () => {
  return (
    <div className={styles["main-content"]}>
      <Category />
      <DashboardTable />
    </div>
  );
};

export default DashboardPage;
