export default function LoadingMsg(props) {
    return <div className={`loading ${props.class}`}>{props.children}</div>
};