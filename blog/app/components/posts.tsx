import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {allBlogs
        .sort((a, b) =>
          new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1
        )
        .map((post) => (
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
  )
}
