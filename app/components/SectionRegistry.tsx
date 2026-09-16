import { isEnabled } from '../lib/featureFlags';
import OverTheMoonLogo from './OverTheMoonLogo';
import ZolaLogo from './ZolaLogo';
import styles from './SectionRegistry.module.css';

export default function SectionRegistry() {
  if (isEnabled('registry')) {
    return (
      <div className={styles.registry}>
        <p>
          Your presence this weekend is the only gift we need! But if you&rsquo;d like to give something, we&rsquo;ve linked a couple registries below.
        </p>
        <div className={styles.links}>
          <a
            href="https://overthemoon.com/apps/registry/joyce-and-ryan"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.registryButton}
            aria-label="Over the Moon registry"
          >
            <OverTheMoonLogo className={styles.overTheMoonLogo} />
          </a>
          <a
            href="https://www.zola.com/registry/joyce-and-ryan-2027"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.registryButton}
            aria-label="Zola registry"
          >
            <ZolaLogo className={styles.zolaLogo} />
          </a>
        </div>
        <p>Thank you for helping us celebrate not just this day, but all the days ahead!</p>
      </div>
    );
  }

  return (
    <div className={styles.registry}>
      <p>We&rsquo;re still working on our registry. Check back soon!</p>
    </div>
  );
}
