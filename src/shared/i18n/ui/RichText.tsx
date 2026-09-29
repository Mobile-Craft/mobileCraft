import { Fragment } from 'react';

/**
 * Renderiza `**negritas**` dentro de una cadena traducida.
 *
 * Existe para que el traductor pueda mover el énfasis dentro de la frase sin
 * tener que partir el texto en trozos que luego hay que recomponer en el JSX.
 */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => (
        <Fragment key={index}>
          {part.startsWith('**') && part.endsWith('**') ? (
            <strong>{part.slice(2, -2)}</strong>
          ) : (
            part
          )}
        </Fragment>
      ))}
    </>
  );
}
