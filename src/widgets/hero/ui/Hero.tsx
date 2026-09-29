import { m } from 'framer-motion';
import { Aurora, Button, Counter, SplitText } from '@/shared/ui';
import { PROFILE } from '@/shared/config';
import { useI18n, RichText } from '@/shared/i18n';
import { EASE_OUT, stagger, staggerItem } from '@/shared/lib/motion';
import { CompileCard } from './CompileCard';
import styles from './Hero.module.css';

export function Hero() {
  const { locale, t } = useI18n();

  return (
    <header className={styles.hero} id="inicio">
      <Aurora
        drift
        blobs={[
          { x: '6%', y: '4%', size: 520, color: 'var(--accent)', opacity: 0.24 },
          { x: '88%', y: '24%', size: 460, color: 'var(--glow-violet)', opacity: 0.24 },
          { x: '40%', y: '66%', size: 500, color: 'var(--glow-cyan)', opacity: 0.2 },
          { x: '76%', y: '98%', size: 380, color: 'var(--glow-green)', opacity: 0.18 },
        ]}
      />

      <div className={styles.grid}>
        <m.div className={styles.intro} variants={stagger(0.08)} initial="hidden" animate="visible">
          <m.div className={styles.badge} variants={staggerItem}>
            <span className={styles.badgeDot} aria-hidden="true" />
            <span className={styles.badgeText}>{t.hero.role}</span>
          </m.div>

          <m.p className={styles.kicker} variants={staggerItem}>
            {t.hero.greeting(PROFILE.shortName)}
          </m.p>

          {/*
            La `key` reinicia la animación por palabras al cambiar de idioma;
            sin ella el titular nuevo aparecería con las palabras ya reveladas.
          */}
          <h1 className={styles.title}>
            <SplitText key={locale} text={t.hero.headline} delay={0.15} />
          </h1>

          <m.p className={styles.lead} variants={staggerItem}>
            <RichText text={t.hero.lead} />
          </m.p>

          <m.div className={styles.actions} variants={staggerItem}>
            <Button href="#aporte">{t.hero.ctaSolutions}</Button>
            <Button href="#proyectos" variant="ghost">
              {t.hero.ctaProjects}
            </Button>
          </m.div>

          {/* El CV sólo se ofrece si el archivo existe: nunca un enlace roto. */}
          {PROFILE.cv ? (
            <m.p className={styles.cv} variants={staggerItem}>
              <a className={styles.cvLink} href={PROFILE.cv} download>
                {t.hero.ctaCv}
              </a>
            </m.p>
          ) : null}

          <m.p className={styles.availability} variants={staggerItem}>
            {t.hero.location} · {t.hero.availability}
          </m.p>

          <m.dl className={styles.stats} variants={staggerItem}>
            {t.hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className={styles.statValue}>
                  <Counter to={stat.target} suffix={stat.suffix} />
                </dt>
                <dd className={styles.statLabel}>{stat.label}</dd>
              </div>
            ))}
          </m.dl>
        </m.div>

        <m.div
          className={styles.aside}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.18 }}
        >
          <CompileCard />
        </m.div>
      </div>
    </header>
  );
}
