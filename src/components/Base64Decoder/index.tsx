import {useState} from 'react';
import styles from './styles.module.css';

export default function Base64Decoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  function decode() {
    try {
      setOutput(atob(input.trim()));
    } catch {
      setOutput('Code invalide — vérifiez que vous avez bien tout copié.');
    }
  }

  return (
    <div className={styles.decoder}>
      <label className={styles.label}>Coller le code ici :</label>
      <textarea
        className={styles.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Coller le code base64..."
        rows={3}
      />
      <button className={styles.button} onClick={decode}>
        Décoder
      </button>
      {output && (
        <div className={styles.output}>
          <label className={styles.label}>Résultat :</label>
          <p className={styles.result}>
            {output.startsWith('http') ? (
              <a
                href={output}
                target="_blank"
                rel="noopener noreferrer"
              >
                {output}
              </a>
            ) : (
              output
            )}
          </p>
        </div>
      )}
    </div>
  );
}
