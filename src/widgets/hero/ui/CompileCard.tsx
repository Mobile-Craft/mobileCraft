import { AnimatePresence, m } from 'framer-motion';
import { Counter, Picture } from '@/shared/ui';
import { PROFILE } from '@/shared/config';
import { useI18n } from '@/shared/i18n';
import { EASE_OUT, stagger, staggerItem } from '@/shared/lib/motion';
import { useCompileSequence } from '../model/useCompileSequence';
import styles from './CompileCard.module.css';

/** Los huecos se rellenan a ancho fijo en el build; sobra el relleno. */
const BUILD = {
  commit: __BUILD_INFO__.commit,
  builtAt: __BUILD_INFO__.builtAt,
  modules: __BUILD_INFO__.modules.trim(),
  bundleGzipKb: __BUILD_INFO__.bundleGzipKb.trim(),
};

/**
 * Tarjeta interactiva del hero: un "editor" que compila el perfil.
 *
 * Es la única pieza puramente lúdica de la página, así que carga con dos
 * detalles: las líneas de código entran escalonadas al montar y el panel de
 * identidad sólo se despliega cuando la compilación termina.
 */
export function CompileCard() {
  const { t } = useI18n();
  const copy = t.compile;
  const { status, progress, done, running, compile } = useCompileSequence();

  const icon = running ? '◼' : done ? '↺' : '▶';
  const label = running ? copy.running : done ? copy.again : copy.start;

  return (
    <div className={styles.card}>
      <div className={styles.chrome}>
        <div className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className={styles.filename}>{copy.filename}</span>
      </div>

      <m.pre
        className={styles.code}
        variants={stagger(0.06, 0.25)}
        initial="hidden"
        animate="visible"
      >
        <m.div variants={staggerItem}>
          <span className={styles.keyword}>interface</span>{' '}
          <span className={styles.type}>{copy.typeName}</span>{' '}
          <span className={styles.punct}>{'{'}</span>
        </m.div>
        <m.div variants={staggerItem} className={styles.indent}>
          <span className={styles.prop}>{copy.props.name}</span>
          <span className={styles.punct}>:</span>{' '}
          <span className={styles.string}>&apos;{PROFILE.name}&apos;</span>
          <span className={styles.punct}>;</span>
        </m.div>
        <m.div variants={staggerItem} className={styles.indent}>
          <span className={styles.prop}>{copy.props.experience}</span>
          <span className={styles.punct}>:</span>{' '}
          <span className={styles.string}>&apos;{copy.experienceValue}&apos;</span>
          <span className={styles.punct}>;</span>
        </m.div>
        <m.div variants={staggerItem} className={styles.indent}>
          <span className={styles.prop}>{copy.props.apps}</span>
          <span className={styles.punct}>:</span>{' '}
          <span className={styles.number}>
            <Counter to={4} />
          </span>
          <span className={styles.punct}>;</span>
        </m.div>
        <m.div variants={staggerItem} className={styles.indent}>
          <span className={styles.prop}>{copy.props.focus}</span>
          <span className={styles.punct}>:</span>{' '}
          <span className={styles.string}>&apos;{copy.focusValue}&apos;</span>
          <span className={styles.punct}>;</span>
        </m.div>
        <m.div variants={staggerItem} className={styles.indent}>
          <span className={styles.prop}>{copy.props.leadership}</span>
          <span className={styles.punct}>:</span> <span className={styles.keyword}>true</span>
          <span className={styles.punct}>;</span>
        </m.div>
        <m.div variants={staggerItem}>
          <span className={styles.punct}>{'}'}</span>
        </m.div>
        <div className={styles.spacer} />
        <m.div variants={staggerItem} className={styles.comment}>
          {copy.comment}
        </m.div>
        <m.div variants={staggerItem}>
          <span className={styles.keyword}>const</span> <span className={styles.prop}>result</span>{' '}
          <span className={styles.punct}>=</span> <span className={styles.keyword}>await</span>{' '}
          <span className={styles.type}>build</span>
          <span className={styles.punct}>({copy.typeName});</span>
          <span className={styles.caret} aria-hidden="true" />
        </m.div>
      </m.pre>

      <div className={styles.footer}>
        <m.button
          type="button"
          className={styles.compile}
          onClick={compile}
          aria-label={label}
          title={label}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={icon}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.18 }}
              aria-hidden="true"
            >
              {icon}
            </m.span>
          </AnimatePresence>
        </m.button>

        <div className={styles.progressWrap}>
          {/* `aria-live` para que el avance se anuncie sin robar el foco. */}
          <p className={styles.status} aria-live="polite">
            {status}
          </p>
          <div
            className={styles.track}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={copy.progressLabel}
          >
            <m.div
              className={styles.bar}
              initial={false}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.38, ease: EASE_OUT }}
            />
          </div>
        </div>

        <span className={styles.pct}>{progress}%</span>
      </div>

      <AnimatePresence initial={false}>
        {done ? (
          <m.div
            className={styles.reveal}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            <div className={styles.revealInner}>
              <Picture
                className={styles.portrait}
                src={PROFILE.portrait}
                alt={copy.portraitAlt(PROFILE.shortName)}
                sizes="78px"
              />
              <div className={styles.identity}>
                <p className={styles.identityName}>{PROFILE.name}</p>
                <p className={styles.identityRole}>{copy.identityRole}</p>
                <div className={styles.identityChips}>
                  {copy.identityChips.map((chip, index) => (
                    <span
                      key={chip}
                      className={`chip chip--mono${index === 0 ? ` ${styles.chipAccent}` : ''}`}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/*
              Datos medidos sobre este mismo bundle en tiempo de build. Es lo
              único que separa a esta tarjeta de una animación decorativa: las
              cifras se pueden contrastar corriendo `npm run build`.
            */}
            <dl className={styles.build}>
              <dt className={styles.buildLabel}>{copy.build.label}</dt>
              <dd className={styles.buildValue}>
                {copy.build.modules(BUILD.modules)} · {copy.build.size(BUILD.bundleGzipKb)}
              </dd>
              <dd className={styles.buildValue}>
                {copy.build.commit(BUILD.commit, BUILD.builtAt)}
              </dd>
            </dl>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
