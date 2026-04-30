export default function PageSection({ id, title, children, headingClassName = 'mb-4' }) {
    return (
        <section id={id}>
            <h2 className={`text-xl font-bold ${headingClassName}`}>{title}</h2>
            {children}
        </section>
    );
}
