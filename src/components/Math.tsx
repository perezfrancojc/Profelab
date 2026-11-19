import katex from 'katex';

export function MathText({ text }: { text: string }) {
  const parts = String(text ?? '').split(/(\$[^$]+\$)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.length > 2 && part.startsWith('$') && part.endsWith('$')) {
          const html = katex.renderToString(part.slice(1, -1), {
            throwOnError: false,
            output: 'html',
          });
          return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}