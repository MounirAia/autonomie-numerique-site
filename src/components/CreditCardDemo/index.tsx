import { useState, type FormEvent } from 'react';
import styles from './styles.module.css';

// The "correct" card details printed on the fake card
const VALID_CARD = '4539 1488 0343 6467';
const VALID_EXPIRY = '09 / 28';
const VALID_CVC = '847';
const VALID_NAME = 'Jean Tremblay';

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length > 2) return digits.slice(0, 2) + ' / ' + digits.slice(2);
  return digits;
}

/* ========== Fake flippable credit card ========== */
function FakeCreditCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={styles.cardScene} onClick={() => setFlipped((f) => !f)}>
      <div className={`${styles.card3d} ${flipped ? styles.card3dFlipped : ''}`}>
        {/* ---- Front ---- */}
        <div className={`${styles.cardFace} ${styles.cardFront}`}>
          <div className={styles.cardChip}></div>
          <p className={styles.cardNumber}>{VALID_CARD}</p>
          <div className={styles.cardBottom}>
            <div>
              <span className={styles.cardSmallLabel}>Titulaire</span>
              <p className={styles.cardHolder}>{VALID_NAME}</p>
            </div>
            <div>
              <span className={styles.cardSmallLabel}>Expiration</span>
              <p className={styles.cardExpiry}>09/28</p>
            </div>
          </div>
          <span className={styles.cardBrand}>VISA</span>
        </div>
        {/* ---- Back ---- */}
        <div className={`${styles.cardFace} ${styles.cardBack}`}>
          <div className={styles.cardStripe}></div>
          <div className={styles.cardCvcArea}>
            <span className={styles.cardSmallLabel}>CVC</span>
            <span className={styles.cardCvcValue}>{VALID_CVC}</span>
          </div>
          <p className={styles.cardBackNote}>
            Cliquer pour retourner la carte
          </p>
        </div>
      </div>
      {/* Print: both sides shown flat */}
      <div className={styles.cardPrintFront}>
        <div className={styles.cardChip}></div>
        <p className={styles.cardNumber}>{VALID_CARD}</p>
        <div className={styles.cardBottom}>
          <div>
            <span className={styles.cardSmallLabel}>Titulaire</span>
            <p className={styles.cardHolder}>{VALID_NAME}</p>
          </div>
          <div>
            <span className={styles.cardSmallLabel}>Expiration</span>
            <p className={styles.cardExpiry}>09/28</p>
          </div>
        </div>
        <span className={styles.cardBrand}>VISA</span>
      </div>
      <div className={styles.cardPrintBack}>
        <div className={styles.cardStripe}></div>
        <div className={styles.cardCvcArea}>
          <span className={styles.cardSmallLabel}>CVC</span>
          <span className={styles.cardCvcValue}>{VALID_CVC}</span>
        </div>
      </div>
    </div>
  );
}

/* ========== Main component ========== */
export default function CreditCardDemo() {
  const [card, setCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postal, setPostal] = useState('');
  const [error, setError] = useState('');
  const [paid, setPaid] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // All fields required
    if (!name.trim() || !address.trim() || !city.trim() || !postal.trim()) {
      setError('Tous les champs de livraison sont obligatoires.');
      return;
    }
    if (!card.trim() || !expiry.trim() || !cvc.trim()) {
      setError('Tous les champs de paiement sont obligatoires.');
      return;
    }

    // Validate card matches the fake card
    if (card !== VALID_CARD) {
      setError('Numéro de carte invalide. Regarde bien la carte ci-dessus !');
      return;
    }
    if (expiry !== VALID_EXPIRY) {
      setError("Date d'expiration invalide. Regarde le devant de la carte.");
      return;
    }
    if (cvc !== VALID_CVC) {
      setError('Code CVC invalide. Retourne la carte pour le trouver !');
      return;
    }

    setError('');
    setPaid(true);
  }

  function handleReset() {
    setCard('');
    setExpiry('');
    setCvc('');
    setName('');
    setAddress('');
    setCity('');
    setPostal('');
    setError('');
    setPaid(false);
  }

  return (
    <>
      {/* ---- Fake card (interactive exercise) ---- */}
      <p className={styles.cardInstruction}>
        Clique sur la carte pour la retourner et trouver toutes les informations
        nécessaires pour remplir le formulaire de paiement :
      </p>
      <FakeCreditCard />

      {/* ---- Checkout form ---- */}
      <div className={styles.wrapper}>
        {/* ---------- Left: order summary ---------- */}
        <div className={styles.summary}>
          <p className={styles.shopName}>Boutique en ligne</p>
          <p className={styles.totalLabel}>Total</p>
          <p className={styles.totalAmount}>49,99 $</p>
        </div>

        {/* ---------- Right: payment form ---------- */}
        <div className={styles.formSide}>
          {paid ? (
            <div className={styles.success}>
              <p className={styles.successIcon}>&#10003;</p>
              <p><strong>Paiement simulé réussi !</strong></p>
              <p>Aucune vraie transaction n'a été effectuée.</p>
              <button className={styles.resetBtn} onClick={handleReset} type="button">
                Recommencer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} autoComplete="off" noValidate>
              {/* Shipping */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Adresse de livraison</legend>
                <label className={styles.label}>
                  Nom complet
                  <input
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jean Tremblay"
                  />
                </label>
                <label className={styles.label}>
                  Adresse
                  <input
                    className={styles.input}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 rue Sainte-Catherine"
                  />
                </label>
                <div className={styles.row}>
                  <label className={styles.label}>
                    Ville
                    <input
                      className={styles.input}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Montréal"
                    />
                  </label>
                  <label className={styles.label}>
                    Code postal
                    <input
                      className={styles.input}
                      value={postal}
                      onChange={(e) => setPostal(e.target.value)}
                      placeholder="H2X 1Y6"
                    />
                  </label>
                </div>
              </fieldset>

              {/* Card */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Informations de paiement</legend>

                <label className={styles.label}>
                  <span className={styles.labelText}>
                    Numéro de carte
                    <span className={styles.annotation}>&larr; 16 chiffres sur le devant de la carte</span>
                  </span>
                  <div className={styles.cardInputRow}>
                    <input
                      className={`${styles.input} ${styles.cardInput}`}
                      value={card}
                      onChange={(e) => setCard(formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      inputMode="numeric"
                      maxLength={19}
                    />
                    <span className={styles.cardIcons}>
                      <img src="https://img.icons8.com/color/28/visa.png" alt="Visa" />
                      <img src="https://img.icons8.com/color/28/mastercard-logo.png" alt="Mastercard" />
                    </span>
                  </div>
                </label>

                <div className={styles.row}>
                  <label className={styles.label}>
                    <span className={styles.labelText}>
                      Date d'expiration
                      <span className={styles.annotation}>&larr; MM/AA sur le devant</span>
                    </span>
                    <input
                      className={styles.input}
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      placeholder="MM / AA"
                      inputMode="numeric"
                      maxLength={7}
                    />
                  </label>
                  <label className={styles.label}>
                    <span className={styles.labelText}>
                      CVC
                      <span className={styles.annotation}>&larr; 3 chiffres au dos de la carte</span>
                    </span>
                    <input
                      className={styles.input}
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                      placeholder="123"
                      inputMode="numeric"
                      maxLength={3}
                    />
                  </label>
                </div>
              </fieldset>

              {error && <p className={styles.errorMsg}>{error}</p>}

              <button className={styles.payBtn} type="submit">
                Payer 49,99 $
              </button>
              <p className={styles.disclaimer}>
                Ceci est une simulation. Aucune vraie transaction ne sera effectuée.
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
