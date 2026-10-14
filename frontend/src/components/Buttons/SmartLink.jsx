import { Link } from "react-router-dom";

// Internal routes use the router; everything else opens in a new tab.
const SmartLink = ({ to, href, children, ...rest }) => {
    if (to) return <Link to={to} {...rest}>{children}</Link>;
    const external = /^https?:\/\//.test(href);
    return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
            {children}
            {external && <span className="sr-only"> (yeni sekmede açılır)</span>}
        </a>
    );
};

export default SmartLink;
