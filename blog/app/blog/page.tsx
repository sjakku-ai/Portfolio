import { redirect } from 'next/navigation'
import { getBlogPosts } from 'app/blog/utils'

export const metadata = {
  title: 'Blog',
  description: 'Writing on AI, systems, and software engineering.',
}

export default function BlogPage() {
  const latest = getBlogPosts().sort(
    (a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  )[0]
  redirect(`/blog/${latest.slug}.html`)
}
