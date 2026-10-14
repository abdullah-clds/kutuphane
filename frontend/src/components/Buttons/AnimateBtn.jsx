import "./revbtn.css";

// Two stacked labels that roll on hover (original effect). Rendered as spans so the
// component can sit inside real links and buttons; the duplicate is hidden from screen readers.
const AnimateBtn = (props) => {
    return (
        <span className="link-line block">
            <span aria-hidden="true" className="rev-link rev-top text-[12px]">{props.btnName}</span>
            <span className="rev-link text-[12px]">{props.btnName}</span>
        </span>
    )
}

export default AnimateBtn
