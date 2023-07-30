import styles from './CallReceiptPage.module.css';
import {ReactComponent as Logo} from '@assets/svg/CallReceipt/logo.svg';

const CallReceiptPage: React.FC = () => {
    return <div className={styles["container"]}>
        <div className={styles["heading"]}>
            <span className={styles["title"]}>
                Powered by
            </span>
            <div className={styles["logo"]}>
                <Logo/>
            </div>
        </div>
    </div>
}

export default CallReceiptPage;