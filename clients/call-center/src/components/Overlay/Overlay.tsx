import styles from "./Overlay.module.css";

interface OverlayProps {
    onCloseOverlay: () => void;
}


const Overlay: React.FC<OverlayProps> = (props: OverlayProps) => {
    return <div className={styles["overlay"]} onClick = {props.onCloseOverlay}>
    </div>
}   

export default Overlay;