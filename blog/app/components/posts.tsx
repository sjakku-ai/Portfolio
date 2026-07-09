import Link from 'next/link'
import { BlogPost, formatDate, getBlogPosts } from 'app/blog/utils'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function groupPosts(posts: BlogPost[]) {
  let sorted = [...posts].sort((a, b) =>
    new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1
  )

  let years: { year: string; months: { month: string; posts: BlogPost[] }[] }[] = []

  for (let post of sorted) {
    let date = new Date(`${post.metadata.publishedAt}T00:00:00`)
    let year = String(date.getFullYear())
    let month = MONTH_NAMES[date.getMonth()]

    let yearGroup = years.find((y) => y.year === year)
    if (!yearGroup) {
      yearGroup = { year, months: [] }
      years.push(yearGroup)
    }

    let monthGroup = yearGroup.months.find((m) => m.month === month)
    if (!monthGroup) {
      monthGroup = { month, posts: [] }
      yearGroup.months.push(monthGroup)
    }

    monthGroup.posts.push(post)
  }

  return years
}

export function BlogPosts() {
  let years = groupPosts(getBlogPosts())

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {years.map((yearGroup) => (
        <div key={yearGroup.year}>
          <p style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            color: 'var(--text)',
            marginBottom: '16px',
          }}>
            {yearGroup.year}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {yearGroup.months.map((monthGroup, monthIndex) => (
              <details
                key={monthGroup.month}
                open={yearGroup === years[0] && monthIndex === 0}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '2px 0',
                }}
              >
                <summary style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--dim)',
                  padding: '10px 14px',
                  cursor: 'pointer',
                  userSelect: 'none',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span>{monthGroup.month}</span>
                  <span style={{ color: 'var(--dim)', opacity: 0.6 }}>
                    {monthGroup.posts.length}
                  </span>
                </summary>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '4px 14px 14px' }}>
                  {monthGroup.posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}.html`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="blog-post-card" style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '10px',
                        padding: '14px 18px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        gap: '12px',
                      }}>
                        <p style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          color: 'var(--text)',
                          margin: 0,
                          lineHeight: 1.4,
                        }}>
                          {post.metadata.title}
                        </p>
                        <p style={{
                          fontFamily: 'var(--font-geist-mono)',
                          fontSize: '11px',
                          color: 'var(--dim)',
                          margin: 0,
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                        }}>
                          {formatDate(post.metadata.publishedAt, false)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
