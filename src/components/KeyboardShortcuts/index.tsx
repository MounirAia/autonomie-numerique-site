import type { ReactNode } from 'react';
import { useState, useMemo, Fragment } from 'react';
import styles from './styles.module.css';

interface Shortcut {
  id: string;
  display: string[];
  keys: string[];
  description: string;
}

interface KeyDef {
  id: string;
  label: string;
  width?: 'wide' | 'wider' | 'widest';
}

const SHORTCUTS: Shortcut[] = [
  { id: 'ctrl-c',     display: ['Ctrl', 'C'],   keys: ['ctrl', 'c'],      description: 'Copier' },
  { id: 'ctrl-v',     display: ['Ctrl', 'V'],   keys: ['ctrl', 'v'],      description: 'Coller' },
  { id: 'ctrl-z',     display: ['Ctrl', 'Z'],   keys: ['ctrl', 'z'],      description: 'Annuler' },
  { id: 'ctrl-a',     display: ['Ctrl', 'A'],   keys: ['ctrl', 'a'],      description: 'Tout sélectionner' },
  { id: 'ctrl-f',     display: ['Ctrl', 'F'],   keys: ['ctrl', 'f'],      description: 'Rechercher' },
  { id: 'win',        display: ['⊞ Win'],       keys: ['win'],            description: 'Menu Démarrer' },
  { id: 'ctrl-plus',  display: ['Ctrl', '+'],   keys: ['ctrl', 'equals'], description: 'Zoomer' },
  { id: 'ctrl-minus', display: ['Ctrl', '−'],   keys: ['ctrl', 'minus'],  description: 'Dézoomer' },
  { id: 'alt-tab',    display: ['Alt', 'Tab'],  keys: ['alt', 'tab'],     description: 'Changer de fenêtre' },
];

const KEYBOARD_ROWS: KeyDef[][] = [
  // Number row
  [
    { id: 'backtick', label: '`' },
    { id: '1', label: '1' }, { id: '2', label: '2' }, { id: '3', label: '3' },
    { id: '4', label: '4' }, { id: '5', label: '5' }, { id: '6', label: '6' },
    { id: '7', label: '7' }, { id: '8', label: '8' }, { id: '9', label: '9' },
    { id: '0', label: '0' },
    { id: 'minus',  label: '−' },
    { id: 'equals', label: '=' },
    { id: 'backspace', label: '⌫ Bksp', width: 'wide' },
  ],
  // QWERTY row
  [
    { id: 'tab', label: 'Tab ↹', width: 'wide' },
    { id: 'q', label: 'Q' }, { id: 'w', label: 'W' }, { id: 'e', label: 'E' },
    { id: 'r', label: 'R' }, { id: 't', label: 'T' }, { id: 'y', label: 'Y' },
    { id: 'u', label: 'U' }, { id: 'i', label: 'I' }, { id: 'o', label: 'O' },
    { id: 'p', label: 'P' },
    { id: 'bracketleft',  label: '[' },
    { id: 'bracketright', label: ']' },
    { id: 'backslash', label: '\\' },
  ],
  // Home row
  [
    { id: 'caps', label: 'Caps', width: 'wider' },
    { id: 'a', label: 'A' }, { id: 's', label: 'S' }, { id: 'd', label: 'D' },
    { id: 'f', label: 'F' }, { id: 'g', label: 'G' }, { id: 'h', label: 'H' },
    { id: 'j', label: 'J' }, { id: 'k', label: 'K' }, { id: 'l', label: 'L' },
    { id: 'semicolon', label: ';' },
    { id: 'quote', label: "'" },
    { id: 'enter', label: '↵ Enter', width: 'wider' },
  ],
  // Shift row
  [
    { id: 'shift-l', label: '⇧ Shift', width: 'wider' },
    { id: 'z', label: 'Z' }, { id: 'x', label: 'X' }, { id: 'c', label: 'C' },
    { id: 'v', label: 'V' }, { id: 'b', label: 'B' }, { id: 'n', label: 'N' },
    { id: 'm', label: 'M' },
    { id: 'comma',  label: ',' },
    { id: 'period', label: '.' },
    { id: 'slash',  label: '/' },
    { id: 'shift-r', label: '⇧ Shift', width: 'wider' },
  ],
  // Bottom modifier row
  [
    { id: 'ctrl-l', label: 'Ctrl',   width: 'wide' },
    { id: 'win',    label: '⊞ Win',  width: 'wide' },
    { id: 'alt-l',  label: 'Alt',    width: 'wide' },
    { id: 'space',  label: '',        width: 'widest' },
    { id: 'alt-r',  label: 'Alt',    width: 'wide' },
    { id: 'ctrl-r', label: 'Ctrl',   width: 'wide' },
  ],
];

/** Resolve a logical key name to one or more physical key IDs */
function resolveKeyIds(key: string): string[] {
  if (key === 'ctrl')  return ['ctrl-l'];
  if (key === 'alt')   return ['alt-l'];
  if (key === 'shift') return ['shift-l', 'shift-r'];
  return [key];
}

function keyWidthClass(width?: string): string {
  if (width === 'wide')   return styles.keyWide;
  if (width === 'wider')  return styles.keyWider;
  if (width === 'widest') return styles.keyWidest;
  return '';
}

export default function KeyboardShortcuts(): ReactNode {
  const [activeId, setActiveId] = useState<string>(SHORTCUTS[0].id);
  const activeShortcut = SHORTCUTS.find(s => s.id === activeId)!;

  /** Keys lit up for the currently selected shortcut (interactive, screen only) */
  const activeKeys = useMemo<Set<string>>(() => {
    const s = new Set<string>();
    activeShortcut.keys.forEach(k => resolveKeyIds(k).forEach(id => s.add(id)));
    return s;
  }, [activeShortcut]);

  /** Union of all keys across every shortcut — highlighted on print */
  const allUsedKeys = useMemo<Set<string>>(() => {
    const s = new Set<string>();
    SHORTCUTS.forEach(sc => sc.keys.forEach(k => resolveKeyIds(k).forEach(id => s.add(id))));
    return s;
  }, []);

  return (
    <div>
      {/* Shortcut cards */}
      <div className={styles.shortcutGrid}>
        {SHORTCUTS.map(sc => (
          <button
            key={sc.id}
            type="button"
            className={[
              styles.shortcutCard,
              sc.id === activeId ? styles.shortcutCardActive : '',
            ].filter(Boolean).join(' ')}
            onClick={() => setActiveId(sc.id)}
          >
            <div className={styles.cardKeys}>
              {sc.display.map((k, i) => (
                <Fragment key={i}>
                  {i > 0 && <span className={styles.plus}> + </span>}
                  <kbd>{k}</kbd>
                </Fragment>
              ))}
            </div>
            <p className={styles.cardDesc}>{sc.description}</p>
          </button>
        ))}
      </div>

      {/* QWERTY keyboard */}
      <div className={styles.keyboard} aria-hidden="true">
        {KEYBOARD_ROWS.map((row, ri) => (
          <div key={ri} className={styles.keyRow}>
            {row.map(key => {
              const isActive         = activeKeys.has(key.id);
              const isPrintHighlight = allUsedKeys.has(key.id);
              return (
                <div
                  key={key.id}
                  className={[
                    styles.key,
                    keyWidthClass(key.width),
                    isActive         ? styles.keyActive         : '',
                    isPrintHighlight ? styles.keyPrintHighlight : '',
                  ].filter(Boolean).join(' ')}
                >
                  {key.label}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
