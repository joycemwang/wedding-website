import { isEnabled } from '../lib/featureFlags';
import Button from './Button';
import styles from './SectionRSVP.module.css';

export default function SectionRSVP() {
  if (isEnabled('rsvp')) {
    return (
      <div className={styles.rsvp}>
        <p className={styles.intro}>Kindly let us know if you&rsquo;ll be joining us by July 15.</p>
        <div className={styles.buttonWrap}>
          <Button href="/rsvp" variant="primary" color="var(--color-burgundy)">
            RSVP
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.rsvp}>
      <p className={styles.intro}>While we are not accepting RSVPs at this time, please let us know if you are unable to make it!</p>
    </div>
  );
};
