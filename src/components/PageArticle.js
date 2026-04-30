export default function PageArticle({ children }) {
    return (
        <article className="max-w-[42rem] mx-auto px-4 pb-10 pt-6 sm:pb-16 sm:pt-8 space-y-12">
            {children}
        </article>
    );
}
