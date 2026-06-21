import { BlogPosts } from 'app/components/posts'

const skills = ['C++', 'Go', 'Cloud-Native', 'AI / Agents', 'Real-Time Systems', 'Video Broadcasting', 'Solution Architecture']

export default function Page() {
  return (
    <section>
      {/* Eyebrow */}
      <p style={{
        fontFamily: 'var(--font-geist-mono)',
        fontSize: '11px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        marginBottom: '12px',
      }}>
        // solution architect &amp; ai engineer
      </p>

      {/* Name */}
      <h1 style={{
        fontSize: 'clamp(28px, 5vw, 42px)',
        fontWeight: 600,
        lineHeight: 1.15,
        letterSpacing: '-0.02em',
        color: 'var(--text)',
        marginBottom: '20px',
      }}>
        Sireesha Jakku
      </h1>

      {/* Bio card */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '20px 24px',
        marginBottom: '16px',
      }}>
        <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.75, margin: 0 }}>
          Two decades of turning complex engineering challenges into reliable systems.
          I design and build software that keeps broadcasts on air — real-time health monitoring,
          device configuration, and ingest/playout management for the video broadcasting industry.
        </p>
        <br />
        <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.75, margin: 0 }}>
          Solution Architect by role, engineer at heart. I specialize in C++, Go, and cloud-native
          architecture, and I&apos;m deeply passionate about AI and autonomous agents — actively
          exploring how they can reshape the way we build and operate complex systems. I believe the
          best engineers never stop learning, and I bring that mindset to everything I do.
        </p>
      </div>

      {/* Skills pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
        {skills.map(skill => (
          <span key={skill} style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '11px',
            padding: '4px 12px',
            borderRadius: '20px',
            border: '1px solid rgba(79,142,247,0.25)',
            background: 'rgba(79,142,247,0.06)',
            color: 'var(--accent)',
          }}>
            {skill}
          </span>
        ))}
      </div>

      {/* Blog posts */}
      <div>
        <p style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--dim)',
          marginBottom: '14px',
        }}>
          // writing
        </p>
        <BlogPosts />
      </div>
    </section>
  )
}
