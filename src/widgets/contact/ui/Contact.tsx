import { useId, useState, type FormEvent } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Button, Reveal } from '@/shared/ui';
import { PROFILE } from '@/shared/config';
import { useI18n } from '@/shared/i18n';
import { EASE_OUT } from '@/shared/lib/motion';
import styles from './Contact.module.css';

type Status = 'idle' | 'sent' | 'error';

export function Contact() {
  const { t } = useI18n();
  const copy = t.contact;
  const emailId = useId();
  const messageId = useId();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  /**
   * No hay backend: el formulario compone un `mailto:` con lo escrito.
   * Es honesto con lo que el sitio puede hacer y no promete un envío que
   * nadie está recibiendo.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = message.trim();
    if (!text) {
      setStatus('error');
      return;
    }

    const body = text + (email.trim() ? `\n\n${copy.myEmailLine(email.trim())}` : '');
    const subject = encodeURIComponent(copy.mailSubject);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
    setStatus('sent');
  };

  const reset = () => setStatus('idle');

  return (
    <section className="section" id="contacto" aria-labelledby="contacto-titulo">
      <Reveal className={styles.card}>
        <div className={styles.layout}>
          <div className={styles.pitch}>
            <h2 className={styles.title} id="contacto-titulo">
              {copy.title}
            </h2>
            <p className={styles.lead}>{copy.lead}</p>

            <div className={styles.actions}>
              <Button
                href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(copy.directMailSubject)}`}
              >
                {copy.emailCta}
              </Button>
              <Button
                href={PROFILE.linkedin.href}
                variant="ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.linkedinCta}
              </Button>
              {PROFILE.cv ? (
                <Button href={PROFILE.cv} variant="ghost" download>
                  {t.hero.ctaCv}
                </Button>
              ) : null}
            </div>

            <dl className={styles.details}>
              <div>
                <dt className={styles.detailLabel}>{copy.emailLabel}</dt>
                <dd>
                  <a className={styles.detailValue} href={`mailto:${PROFILE.email}`}>
                    {PROFILE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className={styles.detailLabel}>{copy.linkedinLabel}</dt>
                <dd>
                  <a
                    className={styles.detailValue}
                    href={PROFILE.linkedin.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {PROFILE.linkedin.label}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <h3 className={styles.formTitle}>{copy.formTitle}</h3>
            <p className={styles.formLead}>{copy.formLead}</p>

            <div className={styles.fields}>
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor={emailId}>
                  {copy.emailField} <span aria-hidden="true">{copy.optional}</span>
                </label>
                <input
                  id={emailId}
                  className={styles.input}
                  type="email"
                  autoComplete="email"
                  placeholder={copy.emailPlaceholder}
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    reset();
                  }}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor={messageId}>
                  {copy.messageField}
                </label>
                <textarea
                  id={messageId}
                  className={styles.textarea}
                  rows={4}
                  required
                  aria-invalid={status === 'error'}
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    reset();
                  }}
                />
              </div>

              <Button type="submit" magnetic={false} className={styles.submit}>
                {copy.submit}
              </Button>

              {/* Un solo contenedor `aria-live` para éxito y error. */}
              <div aria-live="polite">
                <AnimatePresence mode="wait">
                  {status !== 'idle' ? (
                    <m.p
                      key={status}
                      className={`${styles.feedback}${status === 'error' ? ` ${styles.error}` : ''}`}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.24, ease: EASE_OUT }}
                    >
                      {status === 'sent' ? copy.sent : copy.error}
                    </m.p>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </form>
        </div>

        <p className={styles.footnote}>
          {t.hero.location} · {t.hero.availability}
        </p>
      </Reveal>
    </section>
  );
}
