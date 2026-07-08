export type BlogPost = {
  metadata: {
    title: string
    publishedAt: string
    summary: string
  }
  slug: string
}

const posts: BlogPost[] = [
  {
    slug: 'gpt-from-scratch-part-3',
    metadata: {
      title: 'Building a GPT From Scratch, Part 3: Loading GPT-2 and Writing My Own Greedy Decode Loop',
      publishedAt: '2026-07-04',
      summary: 'Loading a pretrained GPT-2 checkpoint with Hugging Face, then rebuilding its greedy decoding loop by hand — argmax, one token at a time — to check my understanding against the library\'s own generate() call.',
    },
  },
  {
    slug: 'gpt-from-scratch-part-2',
    metadata: {
      title: 'Building a GPT From Scratch, Part 2: Probability Distributions, Softmax, and Temperature',
      publishedAt: '2026-07-02',
      summary: 'Building gut-level intuition for how a model turns raw scores into word choices — probability distributions, the softmax formula, and how temperature dials a model between decisive and adventurous.',
    },
  },
  {
    slug: 'gpt-from-scratch-part-1',
    metadata: {
      title: 'Building a GPT From Scratch, Part 1: Why Build It Instead of Just Calling an API?',
      publishedAt: '2026-07-01',
      summary: 'Starting a new series: 20-30 minutes a day building a mini GPT-like chatbot from the ground up, to actually understand the tokenization → inference → decoding pipeline.',
    },
  },
  {
    slug: 'llm-building-blocks-glossary',
    metadata: {
      title: 'LLM Building Blocks: A Plain-English Glossary',
      publishedAt: '2026-06-30',
      summary: 'The terms you keep running into when building with language models — defined without the hand-waving.',
    },
  },
  {
    slug: 'footage-twin',
    metadata: {
      title: 'Building FootageTwin: An AI Agent That Edits Video Like a Junior Editor Under Review',
      publishedAt: '2026-05-20',
      summary: 'How we spent 48 hours teaching an LLM to plan, draft, critique, and revise a rough cut — and why the "critique" step is the whole point.',
    },
  },
  {
    slug: 'economics-and-responsible-ai',
    metadata: {
      title: 'AI System Design: Part-5 — The Economics and Ethics of Production AI',
      publishedAt: '2026-02-07',
      summary: 'The most sophisticated AI architecture in the world fails the moment it is unaffordable to run or unsafe to deploy.',
    },
  },
  {
    slug: 'advanced-ai-architectures',
    metadata: {
      title: 'AI System Design: Part-4 — Advanced AI Architectures: RAG, Recommendations, and Real-Time Systems',
      publishedAt: '2026-01-31',
      summary: 'The patterns behind three of the most common — and most misimplemented — AI systems in production.',
    },
  },
  {
    slug: 'deployment-and-monitoring',
    metadata: {
      title: 'AI System Design: Part-3 — Deploying and Keeping AI Models Alive in Production',
      publishedAt: '2026-01-24',
      summary: 'Deployment is where confidence meets reality. Monitoring is where you find out how wrong you were.',
    },
  },
  {
    slug: 'ml-data-and-training',
    metadata: {
      title: 'AI System Design: Part-2 — From Raw Data to Trained Model: Engineering the ML Lifecycle',
      publishedAt: '2026-01-17',
      summary: 'Why data pipelines are harder than model training — and why most production failures trace back to decisions made before a single gradient was computed.',
    },
  },
  {
    slug: 'infrastructure-foundations',
    metadata: {
      title: 'AI System Design: Part-1 — The Infrastructure Every AI Engineer Needs to Understand',
      publishedAt: '2026-01-10',
      summary: 'Why the unglamorous plumbing of VMs, containers, and load balancers decides whether your model ever reaches users.',
    },
  },
  {
    slug: 'advanced_rag_blog_post',
    metadata: {
      title: 'Mastering the Next Level: A Deep Dive into Advanced RAG',
      publishedAt: '2026-03-15',
      summary: 'Transitioning from fragile setups to enterprise-grade production RAG pipelines.',
    },
  },
  {
    slug: 'architect_blueprint_embeddings_vector_db',
    metadata: {
      title: "The Architect's Blueprint: Demystifying Embeddings and Vector Databases in Production",
      publishedAt: '2026-04-01',
      summary: 'Scaling AI context from prototypes to enterprise — how embeddings and vector databases work under the hood.',
    },
  },
]

export function getBlogPosts(): BlogPost[] {
  return posts
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
