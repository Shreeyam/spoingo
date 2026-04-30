export default function IntroParagraphs({ paragraphs = [], start = 0, count }) {
    const selected = typeof count === 'number'
        ? paragraphs.slice(start, start + count)
        : paragraphs.slice(start);

    if (selected.length === 0) return null;

    return (
        <section className="space-y-4 text-[1.0625rem] leading-relaxed text-foreground/90">
            {selected.map((paragraph, i) => (
                <p key={`${start}-${i}`} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
        </section>
    );
}
