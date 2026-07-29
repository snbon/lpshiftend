import { motion } from 'framer-motion';

/**
 * Hero-side visual: three "closure" blocks linked by SHA-256-looking
 * hash prefixes, with a fourth block pulsing in as a new closure. This
 * is the single strongest trust cue the landing carries — it turns the
 * abstract "hash chain" pitch into something you can see.
 *
 * Pure SVG + framer-motion; no runtime dependencies beyond those already
 * in the tree.
 */
export default function HashChainVisual() {
  const blocks = [
    { seq: 1, hash: '3f9a…c8b1', date: '27 Jul' },
    { seq: 2, hash: '8d21…4e77', date: '28 Jul' },
    { seq: 3, hash: 'a1f0…9c33', date: '29 Jul' },
  ];

  return (
    <div className="chain-visual">
      <div className="chain-visual__stack">
        {blocks.map((b, i) => (
          <motion.div
            key={b.seq}
            className="chain-block"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i, duration: 0.45 }}
          >
            <div className="chain-block__meta">
              <span className="chain-block__seq">#{b.seq.toString().padStart(4, '0')}</span>
              <span className="chain-block__date">{b.date}</span>
            </div>
            <div className="chain-block__hashline">
              <span className="chain-block__label">prev</span>
              <code>{i === 0 ? '0000…0000' : blocks[i - 1].hash}</code>
            </div>
            <div className="chain-block__hashline">
              <span className="chain-block__label">hash</span>
              <code>{b.hash}</code>
            </div>
            <span className="chain-block__seal">🔒 sealed</span>
          </motion.div>
        ))}

        <motion.div
          className="chain-block chain-block--pending"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="chain-block__meta">
            <span className="chain-block__seq">#0004</span>
            <motion.span
              className="chain-block__date chain-block__date--live"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              vandaag · open
            </motion.span>
          </div>
          <div className="chain-block__hashline">
            <span className="chain-block__label">prev</span>
            <code>{blocks[blocks.length - 1].hash}</code>
          </div>
          <div className="chain-block__hashline chain-block__hashline--pending">
            <span className="chain-block__label">hash</span>
            <code>—</code>
          </div>
        </motion.div>
      </div>

      <div className="chain-visual__caption">
        Elke dagafsluiting bevat de SHA-256 hash van de vorige. <br />
        Manipulatie = onmiddellijk detecteerbaar.
      </div>
    </div>
  );
}
