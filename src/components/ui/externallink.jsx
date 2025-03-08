import { ExternalLink } from 'lucide-react';

const ExtLink = ({ href, children, ...props }) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            <ExternalLink size={16} className='inline' aria-hidden="true" />{children}
        </a>
    );
};

export default ExtLink;
