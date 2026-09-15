import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const toolsData = [
  {
    name: "ChatGPT",
    slug: "chatgpt",
    tagline: "The world's most versatile multimodal AI assistant",
    description: "The pioneering conversational AI assistant for writing, research, coding, problem-solving, and productivity.",
    longDescription: "ChatGPT by OpenAI is one of the world's most capable AI systems, powered by the GPT-4o and o1 model families. It excels at complex reasoning, technical problem solving, multi-turn discussions, coding, and creative writing. With support for multimodal inputs, voice conversations, web search, Python execution via Advanced Data Analysis, and custom GPT creation, ChatGPT serves as an indispensable daily intelligence engine for millions of professionals, researchers, and students globally.",
    logoUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://chatgpt.com",
    category: "Productivity",
    pricing: "Freemium",
    rating: 4.8,
    reviewCount: 3840,
    platforms: JSON.stringify(["Web", "iOS", "Android", "macOS", "Windows", "API"]),
    features: JSON.stringify([
      "State-of-the-art multimodal reasoning with GPT-4o and OpenAI o1",
      "Real-time web browsing and citations",
      "Code interpreter and Python sandbox for interactive analysis",
      "Native voice mode with emotional inflections",
      "Custom GPTs directory for specialized workflows"
    ]),
    useCases: JSON.stringify([
      "Accelerating software architecture and debugging",
      "Drafting professional communications and executive briefs",
      "Synthesizing scientific papers and market reports",
      "Language learning and multilingual translations"
    ]),
    tags: JSON.stringify(["Conversational AI", "Reasoning", "Multimodal", "Productivity", "OpenAI"]),
    pricingPlans: JSON.stringify([
      { tier: "Free", price: "$0/mo", description: "Access to GPT-4o mini, basic data analysis, and limited GPT-4o queries" },
      { tier: "Plus", price: "$20/mo", description: "5x more messages with GPT-4o, access to OpenAI o1, advanced voice mode, custom GPT builder" },
      { tier: "Team", price: "$25/user/mo", description: "Higher rate limits, dedicated workspace admin console, enterprise data privacy" }
    ]),
    isFeatured: true,
    isVerified: true,
  },
  {
    name: "Claude",
    slug: "claude",
    tagline: "Constitutional AI with unparalleled writing and coding depth",
    description: "Next-generation AI assistant built by Anthropic with exceptional nuance, 200K context window, and coding prowess.",
    longDescription: "Claude by Anthropic represents a breakthrough in safe, reliable, and deeply articulate artificial intelligence. Powered by the Claude 3.5 Sonnet and Haiku model suite, Claude delivers human-level writing nuance, industry-leading coding benchmarks, and complex visual artifact rendering. Its 200,000 token context window enables analysis of entire codebases, financial ledgers, or entire books in a single prompt.",
    logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://claude.ai",
    category: "Writing",
    pricing: "Freemium",
    rating: 4.9,
    reviewCount: 2950,
    platforms: JSON.stringify(["Web", "iOS", "Android", "macOS", "API"]),
    features: JSON.stringify([
      "Industry-benchmark Claude 3.5 Sonnet model",
      "Interactive Artifacts window for live React/SVG/HTML preview",
      "200K token context window for massive file digests",
      "Constitutional AI training for dependable, grounded output",
      "Computer Use API capability for autonomous interface interaction"
    ]),
    useCases: JSON.stringify([
      "Full-stack software engineering and UI prototyping",
      "Rigorous contract review and legal text analysis",
      "Deep editorial polishing and essay synthesis",
      "Complex spreadsheet formula modeling and logic checking"
    ]),
    tags: JSON.stringify(["Anthropic", "Writing", "Artifacts", "Long Context", "Coding"]),
    pricingPlans: JSON.stringify([
      { tier: "Free", price: "$0/mo", description: "Standard access to Claude 3.5 Sonnet with normal message caps" },
      { tier: "Pro", price: "$20/mo", description: "5x usage allowance, priority access during peak hours, early access to new capabilities" },
      { tier: "Team", price: "$25/user/mo", description: "Includes central billing, member management, and shared artifact projects" }
    ]),
    isFeatured: true,
    isVerified: true,
  },
  {
    name: "Cursor",
    slug: "cursor",
    tagline: "The AI-first code editor designed for pair-programming",
    description: "The AI-first code editor designed for pair-programming, instant codebase indexing, and multi-file refactoring.",
    longDescription: "Cursor is an intelligent fork of VS Code engineered from the ground up for deep AI integration. It indexes your entire repository locally, enabling full-context prompt completions, automated multi-file diff generation with Composer, intelligent terminal error diagnosis, and predictive next-action tab autocomplete. It transforms how software engineers design, refactor, and ship software.",
    logoUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://cursor.com",
    category: "Coding",
    pricing: "Freemium",
    rating: 4.9,
    reviewCount: 4120,
    platforms: JSON.stringify(["macOS", "Windows", "Linux"]),
    features: JSON.stringify([
      "Composer mode for autonomous multi-file generation and diff edits",
      "Smart Tab autocomplete that predicts your next 3 keystrokes",
      "Semantic codebase search using local vector embeddings",
      "Seamless 1-click import of all VS Code extensions and settings",
      "Instant terminal error explanation and auto-fix execution"
    ]),
    useCases: JSON.stringify([
      "Rapidly prototyping web and mobile applications from scratch",
      "Large-scale refactoring across multiple files with exact diffs",
      "Navigating unfamiliar enterprise codebases using natural language",
      "Writing test suites and generating API documentation"
    ]),
    tags: JSON.stringify(["Developer Tools", "IDE", "Coding", "VS Code", "Pair Programming"]),
    pricingPlans: JSON.stringify([
      { tier: "Hobby", price: "$0/mo", description: "2,000 completions, 50 fast premium requests per month" },
      { tier: "Pro", price: "$20/mo", description: "Unlimited completions, 500 fast requests/mo, unlimited slow requests" },
      { tier: "Business", price: "$40/user/mo", description: "Enforced privacy mode, centralized billing, team usage dashboard" }
    ]),
    isFeatured: true,
    isVerified: true,
  },
  {
    name: "GitHub Copilot",
    slug: "github-copilot",
    tagline: "Your AI pair programmer built by GitHub and OpenAI",
    description: "Your AI pair programmer, offering contextual code suggestions and chat directly inside popular IDEs.",
    longDescription: "GitHub Copilot is the ubiquitous AI coding companion powered by OpenAI and GitHub's vast repository intelligence. Available in VS Code, JetBrains IDEs, Neovim, and Visual Studio, Copilot suggests whole lines or entire functions as you type, answers architecture queries via Copilot Chat, reviews pull requests, and automates CLI command generation.",
    logoUrl: "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://github.com/features/copilot",
    category: "Coding",
    pricing: "Paid",
    rating: 4.6,
    reviewCount: 5200,
    platforms: JSON.stringify(["macOS", "Windows", "Linux", "Web", "API"]),
    features: JSON.stringify([
      "Inline code completion across dozens of programming languages",
      "Integrated Copilot Chat with context awareness",
      "Pull request summaries and automated code review comments",
      "Copilot in CLI for bash command generation and error tracing",
      "Enterprise governance and IP indemnification protections"
    ]),
    useCases: JSON.stringify([
      "Eliminating boilerplate code in backend services",
      "Writing unit and integration tests automatically",
      "Explaining cryptic regex patterns and legacy algorithms",
      "Accelerating cross-language migration"
    ]),
    tags: JSON.stringify(["GitHub", "Microsoft", "Autocomplete", "Code Review", "Developer Tools"]),
    pricingPlans: JSON.stringify([
      { tier: "Individual", price: "$10/mo", description: "Code completions, chat, and multi-IDE support for individual engineers" },
      { tier: "Business", price: "$19/user/mo", description: "Organization-wide policy management, license delegation, enterprise privacy" },
      { tier: "Enterprise", price: "$39/user/mo", description: "Custom fine-tuned models, GitHub.com chat integration, enterprise support" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Midjourney",
    slug: "midjourney",
    tagline: "Photorealistic art and conceptual image generation",
    description: "Generative AI powerhouse creating photorealistic images, conceptual art, and hyper-detailed visual aesthetics.",
    longDescription: "Midjourney is an independent research lab that produces one of the world's most visually stunning generative text-to-image engines. Known for remarkable photorealism, artistic lighting, fine textures, and imaginative composition, Midjourney is heavily relied upon by digital artists, game studios, cinematographers, brand designers, and creative directors.",
    logoUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://midjourney.com",
    category: "Image",
    pricing: "Paid",
    rating: 4.8,
    reviewCount: 3400,
    platforms: JSON.stringify(["Web", "Discord"]),
    features: JSON.stringify([
      "Version 6.1 with ultra-realistic skin rendering and lighting physics",
      "Dedicated web creation interface with in-painting and out-painting",
      "Style reference (--sref) and character consistency (--cref) controls",
      "High-resolution upscaling and aspect ratio flexibility",
      "Vary (Region) feature for localized image retouching"
    ]),
    useCases: JSON.stringify([
      "Concept art for AAA games and cinematic storyboarding",
      "Editorial illustrations and book cover generation",
      "Moodboards and visual identity explorations for agencies",
      "Photorealistic product photography mockups"
    ]),
    tags: JSON.stringify(["Generative Art", "Image Generation", "Photorealism", "Design", "Concept Art"]),
    pricingPlans: JSON.stringify([
      { tier: "Basic", price: "$10/mo", description: "3.3 fast GPU hours per month, general commercial terms" },
      { tier: "Standard", price: "$30/mo", description: "15 fast hours per month, unlimited relaxed GPU generation" },
      { tier: "Pro", price: "$60/mo", description: "30 fast hours, stealth generation mode, 12 concurrent fast jobs" }
    ]),
    isFeatured: true,
    isVerified: true,
  },
  {
    name: "Perplexity",
    slug: "perplexity",
    tagline: "Citation-backed real-time conversational search engine",
    description: "An AI-powered conversational search engine providing direct, citation-backed answers in real time.",
    longDescription: "Perplexity AI is revolutionizing how people discover knowledge on the internet. Instead of returning a list of blue links, Perplexity scours the live web, analyzes the most authoritative sources, and synthesizes clear, comprehensive answers complete with interactive numeric footnote citations and related follow-up suggestions.",
    logoUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://perplexity.ai",
    category: "Research",
    pricing: "Freemium",
    rating: 4.9,
    reviewCount: 2800,
    platforms: JSON.stringify(["Web", "iOS", "Android", "macOS", "API"]),
    features: JSON.stringify([
      "Pro Search with multi-step query decomposition and deep research",
      "Model switching: Claude 3.5 Sonnet, GPT-4o, Sonar Large, and Grok",
      "Collections space for saving, organizing, and collaborating on queries",
      "File upload for instant PDF, document, and data analysis",
      "Perplexity Pages for turning research threads into publishable articles"
    ]),
    useCases: JSON.stringify([
      "Academic research synthesis with verifiable scientific source citations",
      "Competitive intelligence and real-time market benchmarking",
      "Troubleshooting technical bugs against modern framework documentation",
      "Fact-checking breaking news and verifying claims"
    ]),
    tags: JSON.stringify(["Search Engine", "Research", "Citations", "Knowledge", "Real-time"]),
    pricingPlans: JSON.stringify([
      { tier: "Free", price: "$0/mo", description: "Unlimited standard searches, 5 Pro searches every 4 hours" },
      { tier: "Pro", price: "$20/mo", description: "300+ Pro searches/day, model selector (Sonnet 3.5, GPT-4o), unlimited file uploads" },
      { tier: "Enterprise", price: "$40/user/mo", description: "SOC2 security, internal document search integration, single sign-on" }
    ]),
    isFeatured: true,
    isVerified: true,
  },
  {
    name: "v0 by Vercel",
    slug: "v0-vercel",
    tagline: "Generative UI system producing production React and Tailwind CSS",
    description: "Generative UI system that creates production-ready React components, Tailwind CSS, and full web pages.",
    longDescription: "v0 is Vercel's generative UI platform that translates natural language prompts into clean, accessible, copy-pasteable React code styled with Tailwind CSS and shadcn/ui. Whether you need a sophisticated analytics dashboard, an e-commerce checkout flow, or a landing page hero, v0 iterates instantly with real-time browser preview.",
    logoUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://v0.dev",
    category: "Design",
    pricing: "Freemium",
    rating: 4.7,
    reviewCount: 1980,
    platforms: JSON.stringify(["Web", "API"]),
    features: JSON.stringify([
      "Instant generation of Next.js, React, and Tailwind CSS components",
      "Interactive component preview with click-to-edit elements",
      "Figma design-to-code screenshot upload and reconstruction",
      "One-click deployment directly to Vercel and npm installable CLI",
      "Custom design system token integration"
    ]),
    useCases: JSON.stringify([
      "Prototyping responsive web applications in minutes",
      "Accelerating frontend engineering workflows for modern SaaS products",
      "Converting visual wireframes into fully functional TypeScript components",
      "Building landing page variants for marketing experiments"
    ]),
    tags: JSON.stringify(["Frontend", "React", "Tailwind CSS", "Vercel", "UI Design"]),
    pricingPlans: JSON.stringify([
      { tier: "Free", price: "$0/mo", description: "200 credits/month for standard generation and basic preview" },
      { tier: "Premium", price: "$20/mo", description: "5,000 credits/month, faster generations, private generations" },
      { tier: "Enterprise", price: "Custom", description: "SSO, custom component library training, dedicated account manager" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "ElevenLabs",
    slug: "elevenlabs",
    tagline: "Lifelike voice synthesis, voice cloning, and audio models",
    description: "Industry-leading voice AI research and deployment platform for lifelike speech synthesis and voice cloning.",
    longDescription: "ElevenLabs creates the most expressive, humanlike, and versatile AI voice models available. With support for 32+ languages, emotion controls, instant voice cloning from a 30-second audio clip, and professional voice replication, it powers audiobooks, game narration, corporate videos, podcasts, and conversational AI agents worldwide.",
    logoUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://elevenlabs.io",
    category: "Audio",
    pricing: "Freemium",
    rating: 4.9,
    reviewCount: 3120,
    platforms: JSON.stringify(["Web", "API", "iOS", "Android"]),
    features: JSON.stringify([
      "Expressive Text-to-Speech across 32 languages with emotional inflection",
      "Instant voice cloning and Professional Voice Cloning (PVC)",
      "Conversational AI SDK with sub-500ms latency for voice agents",
      "Automated video dubbing with lip-sync translation",
      "AI sound effects generator for ambient audio and Foley"
    ]),
    useCases: JSON.stringify([
      "Voice acting for characters in video games and animations",
      "Publishing professional audiobooks and long-form podcasts",
      "Building low-latency conversational phone agents and assistants",
      "Dubbing global marketing campaigns into native localized accents"
    ]),
    tags: JSON.stringify(["Voice AI", "Text to Speech", "Voice Cloning", "Dubbing", "Audio"]),
    pricingPlans: JSON.stringify([
      { tier: "Free", price: "$0/mo", description: "10,000 characters/mo, 3 custom voices, speech synthesis" },
      { tier: "Starter", price: "$5/mo", description: "30,000 characters/mo, instant voice cloning, commercial license" },
      { tier: "Creator", price: "$22/mo", description: "100,000 characters/mo, Professional Voice Cloning, high audio quality" }
    ]),
    isFeatured: true,
    isVerified: true,
  },
  {
    name: "Runway Gen-3",
    slug: "runway-gen-3",
    tagline: "Cinematic text and image-to-video foundation model",
    description: "State-of-the-art generative video model that turns text, images, and videos into high-fidelity cinematic scenes.",
    longDescription: "Runway Gen-3 Alpha is a foundational video model capable of generating photorealistic video clips with consistent characters, realistic camera physics, complex lighting transitions, and precise temporal coherence. Used by Hollywood VFX teams and independent creators alike, it offers unmatched creative control over camera motions and motion brush vectors.",
    logoUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://runwayml.com",
    category: "Video",
    pricing: "Freemium",
    rating: 4.7,
    reviewCount: 2210,
    platforms: JSON.stringify(["Web", "iOS", "API"]),
    features: JSON.stringify([
      "Gen-3 Alpha text-to-video, image-to-video, and video-to-video",
      "Motion Brush tool for directional control of distinct scene elements",
      "Director Mode for cinematic camera moves (pan, tilt, zoom, pedestal)",
      "Lip sync video generator for photorealistic talking avatars",
      "Custom model training for brand-specific character and art consistency"
    ]),
    useCases: JSON.stringify([
      "Cinematic visual effects and B-roll generation for filmmakers",
      "High-impact social media video advertisements and brand shorts",
      "Music video creative visualization and sci-fi aesthetic rendering",
      "Rapid pre-visualization for commercial pitch decks"
    ]),
    tags: JSON.stringify(["Generative Video", "VFX", "Cinematography", "Text to Video", "Creative"]),
    pricingPlans: JSON.stringify([
      { tier: "Basic", price: "$0/mo", description: "125 non-renewable credits, standard export resolution" },
      { tier: "Standard", price: "$15/mo", description: "625 credits/mo, up to 4K resolution upscaling, remove watermarks" },
      { tier: "Pro", price: "$35/mo", description: "2,250 credits/mo, custom voice models, unlimited relaxed generation" }
    ]),
    isFeatured: true,
    isVerified: true,
  },
  {
    name: "Suno",
    slug: "suno",
    tagline: "Complete song generation with vocals and full instrumentation",
    description: "Generate complete studio-quality songs with vocals, instruments, and lyrics from simple descriptive prompts.",
    longDescription: "Suno makes it possible for anyone to create remarkable, radio-ready songs across any musical genre — from 80s synth-pop and blues rock to delta blues, hip hop, and classical symphonies. By providing lyrics or letting Suno write them, users produce full compositions with realistic, emotive singing voices and rich musical arrangements in seconds.",
    logoUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://suno.com",
    category: "Audio",
    pricing: "Freemium",
    rating: 4.8,
    reviewCount: 2650,
    platforms: JSON.stringify(["Web", "iOS", "Android"]),
    features: JSON.stringify([
      "V3.5 audio engine producing 4-minute full songs with rich dynamics",
      "Custom lyrics input or intelligent AI lyricist co-generation",
      "Stem separation for extracting individual vocal and instrumental tracks",
      "Cover Song engine for reimagining tracks across completely new genres",
      "Public community showcase with trending musical charts"
    ]),
    useCases: JSON.stringify([
      "Royalty-free background music composition for content creators",
      "Songwriting experimentation and chord progression ideation",
      "Custom jingles and soundtracks for advertisements and games",
      "Fun personalized songs for celebrations and social media"
    ]),
    tags: JSON.stringify(["Music Generation", "Audio AI", "Songwriting", "Vocals", "Creative"]),
    pricingPlans: JSON.stringify([
      { tier: "Basic", price: "$0/mo", description: "50 credits daily (10 songs), non-commercial terms" },
      { tier: "Pro", price: "$10/mo", description: "2,500 credits/mo (500 songs), commercial license, fast generation" },
      { tier: "Premier", price: "$30/mo", description: "10,000 credits/mo (2,000 songs), priority generation queues" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Devin",
    slug: "devin",
    tagline: "Autonomous AI software engineer by Cognition",
    description: "The autonomous AI software engineer capable of planning, executing, and debugging end-to-end coding tasks.",
    longDescription: "Created by Cognition AI, Devin is an autonomous AI software engineer equipped with its own shell, code editor, browser, and execution sandbox. Devin solves real-world GitHub issues, writes full web applications, migrates obsolete libraries, and runs tests to self-correct errors until the objective is reached.",
    logoUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://cognition.ai",
    category: "Developer Tools",
    pricing: "Paid",
    rating: 4.6,
    reviewCount: 890,
    platforms: JSON.stringify(["Web", "API"]),
    features: JSON.stringify([
      "Autonomous planning and multi-step reasoning sandbox",
      "Built-in web browser for reading documentation and testing web apps",
      "Automated pull request creation directly against GitHub repos",
      "Self-healing execution loop that runs tests and fixes runtime stack traces",
      "Interactive human-in-the-loop steering chat"
    ]),
    useCases: JSON.stringify([
      "Tackling maintenance backlogs and resolving low-severity GitHub issues",
      "Upgrading legacy codebases across major framework versions",
      "Building proof-of-concept internal tools and data pipelines",
      "Setting up comprehensive integration test suites"
    ]),
    tags: JSON.stringify(["Autonomous Agent", "Software Engineer", "Coding", "DevOps", "AI Agent"]),
    pricingPlans: JSON.stringify([
      { tier: "Team", price: "$500/mo", description: "Dedicated Devin instances, GitHub repo integration, standard SLA" },
      { tier: "Enterprise", price: "Custom", description: "On-premise sandbox deployment, custom fine-tuning, 24/7 dedicated support" }
    ]),
    isFeatured: true,
    isVerified: true,
  },
  {
    name: "Notion AI",
    slug: "notion-ai",
    tagline: "Integrated intelligence across company notes and wikis",
    description: "Integrated intelligence across your workspace notes, project docs, and knowledge base wikis.",
    longDescription: "Notion AI augments Notion's collaborative workspace with unified question-answering and content creation. It can query across all your company's pages and databases to retrieve answers, summarize messy meeting notes, generate project roadmaps, and auto-fill database attributes based on page context.",
    logoUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://notion.so/product/ai",
    category: "Productivity",
    pricing: "Paid",
    rating: 4.7,
    reviewCount: 3100,
    platforms: JSON.stringify(["Web", "macOS", "Windows", "iOS", "Android"]),
    features: JSON.stringify([
      "Q&A across your entire workspace, Slack, and Google Drive docs",
      "Database autofill to extract summaries, tags, and action items automatically",
      "Writing assistant for tone transformation, translation, and outlining",
      "Meeting note summarizer with automatic action item checklists",
      "Enterprise workspace access permissions respected automatically"
    ]),
    useCases: JSON.stringify([
      "Instant employee onboarding answers from company wiki knowledge",
      "Automating CRM and product feedback tagging in database tables",
      "Drafting product requirement documents (PRDs) from brainstorm bullets",
      "Synthesizing customer interview recordings into strategic takeaways"
    ]),
    tags: JSON.stringify(["Workspace", "Productivity", "Knowledge Base", "Notes", "Wiki"]),
    pricingPlans: JSON.stringify([
      { tier: "Add-on", price: "$10/member/mo", description: "Unlimited AI queries, document Q&A, and database autofill for any Notion plan" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Jasper",
    slug: "jasper",
    tagline: "Enterprise AI marketing platform for on-brand copywriting",
    description: "AI marketing platform built to help enterprise marketing teams create high-converting on-brand content.",
    longDescription: "Jasper is tailored specifically for marketing teams and enterprises seeking scalable, brand-aligned content creation. By learning your company's brand voice, target audience personas, and product knowledge base, Jasper generates high-converting ad copy, blog articles, social media campaigns, and email sequences that adhere strictly to brand style guidelines.",
    logoUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://jasper.ai",
    category: "Marketing",
    pricing: "Paid",
    rating: 4.6,
    reviewCount: 2450,
    platforms: JSON.stringify(["Web", "Chrome Extension", "API"]),
    features: JSON.stringify([
      "Brand Voice calibration with custom style guides and tone rules",
      "Campaigns feature that turns one brief into a 10-channel marketing campaign",
      "SEO mode powered by SurferSEO integration for organic search ranking",
      "Plagiarism detection and automated copyright safeguard scanning",
      "Chrome extension for generating copy inside LinkedIn, Gmail, and CMSs"
    ]),
    useCases: JSON.stringify([
      "Omnichannel product launch copy across social, email, and landing pages",
      "High-volume long-form SEO articles that outrank competitors",
      "A/B testing variant creation for Google and Meta performance ad campaigns",
      "Repurposing webinars and whitepapers into snackable social posts"
    ]),
    tags: JSON.stringify(["Marketing", "Copywriting", "SEO", "Brand Voice", "Content Creation"]),
    pricingPlans: JSON.stringify([
      { tier: "Creator", price: "$49/mo", description: "1 seat, 1 brand voice, access to 50+ templates and SEO mode" },
      { tier: "Pro", price: "$69/mo", description: "Up to 5 seats, 3 brand voices, collaboration tools, Jasper Art" },
      { tier: "Business", price: "Custom", description: "Custom brand voices, enterprise analytics, custom API access" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "DeepSeek",
    slug: "deepseek",
    tagline: "Breakthrough open reasoning model with extreme compute efficiency",
    description: "Ultra-efficient open-weights reasoning and coding model with unmatched price-to-performance efficiency.",
    longDescription: "DeepSeek is an open AI research laboratory known for breakthrough architectures including DeepSeek-V3 and DeepSeek-R1. Achieving parity with premier frontier models on mathematical reasoning, competitive programming, and multilingual translation at a fraction of the compute cost, DeepSeek has established a new gold standard in AI accessibility and efficiency.",
    logoUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://deepseek.com",
    category: "Research",
    pricing: "Free",
    rating: 4.8,
    reviewCount: 3100,
    platforms: JSON.stringify(["Web", "iOS", "Android", "API"]),
    features: JSON.stringify([
      "DeepSeek-R1 reasoning model with open chain-of-thought verification",
      "Mixture-of-Experts (MoE) architecture with 671B parameters",
      "Ultra-low latency inference API costing 95% less than competitors",
      "128K token context length with accurate needle-in-a-haystack retrieval",
      "Open weights available on Hugging Face for private local deployment"
    ]),
    useCases: JSON.stringify([
      "Solving complex mathematical proofs and formal logic puzzles",
      "Massive batch code generation and automated test synthesis",
      "Cost-effective enterprise API integration for high-throughput apps",
      "Private on-premise local deployment via Ollama and vLLM"
    ]),
    tags: JSON.stringify(["Open Weights", "Reasoning", "Math", "DeepSeek", "Research"]),
    pricingPlans: JSON.stringify([
      { tier: "Free Web", price: "$0/mo", description: "Unlimited web access to DeepSeek-V3 and DeepSeek-R1 reasoning mode" },
      { tier: "API Pay-as-you-go", price: "$0.14/1M tokens", description: "Industry-leading low pricing for input and cached tokens" }
    ]),
    isFeatured: true,
    isVerified: true,
  },
  {
    name: "Synthesia",
    slug: "synthesia",
    tagline: "AI avatars and video presentations without cameras",
    description: "Create studio-quality videos with realistic AI avatars and voiceovers in 140+ languages without cameras.",
    longDescription: "Synthesia is the #1 AI video communications platform used by over 50,000 businesses. It enables organizations to produce professional corporate training, customer onboarding, and product demonstration videos by simply typing a script. Choose from over 230 diverse AI avatars, 140+ languages, and rich video editing templates.",
    logoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://synthesia.io",
    category: "Video",
    pricing: "Paid",
    rating: 4.7,
    reviewCount: 1840,
    platforms: JSON.stringify(["Web"]),
    features: JSON.stringify([
      "230+ hyper-realistic photorealistic digital avatars",
      "140+ languages and accents with natural lip-sync matching",
      "Custom studio avatar creation of your company executives",
      "Screen recorder and built-in slide deck template presentation tools",
      "SOC2 Type II certified and enterprise safety governance"
    ]),
    useCases: JSON.stringify([
      "Scaling international corporate training and HR compliance videos",
      "Creating localized customer success walkthroughs in multiple languages",
      "Transforming static PDF documentation into engaging video tutorials",
      "Sales enablement and personalized video outreach"
    ]),
    tags: JSON.stringify(["AI Avatars", "Video Generation", "Corporate Training", "Localization", "Video"]),
    pricingPlans: JSON.stringify([
      { tier: "Starter", price: "$22/mo", description: "1 editor, 120 mins of video/year, 60+ avatars" },
      { tier: "Creator", price: "$67/mo", description: "1 editor, 360 mins of video/year, 90+ avatars, audio uploads" },
      { tier: "Enterprise", price: "Custom", description: "Unlimited video generation, custom avatars, 1-click translation" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Leonardo.ai",
    slug: "leonardo-ai",
    tagline: "Visual production suite for game assets, art, and design",
    description: "Creative suite for digital artists, game developers, and designers with fine-tuned visual control.",
    longDescription: "Leonardo.ai empowers digital creators to generate production-quality game assets, concept art, graphic design illustrations, and textures. With features like Realtime Canvas, PhotoReal, Motion, and custom dataset training, creators maintain granular control over composition, lighting, and art direction.",
    logoUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://leonardo.ai",
    category: "Image",
    pricing: "Freemium",
    rating: 4.8,
    reviewCount: 2280,
    platforms: JSON.stringify(["Web", "iOS", "API"]),
    features: JSON.stringify([
      "Phoenix foundation model with superior prompt obedience and coherent text",
      "Realtime Canvas for instant brush-stroke-to-render generation",
      "Universal Upscaler for 4K and 8K visual detail enhancement",
      "Custom LoRA model training on your proprietary style assets",
      "Motion tool for converting static imagery into subtle ambient video clips"
    ]),
    useCases: JSON.stringify([
      "Generating 2D and 3D textured game assets and character portraits",
      "Marketing graphic creation and high-impact social media creatives",
      "Interior design concept rendering and architectural moodboards",
      "App and website icon design with transparent backgrounds"
    ]),
    tags: JSON.stringify(["Game Assets", "Design", "Image Generation", "Fine Tuning", "Art"]),
    pricingPlans: JSON.stringify([
      { tier: "Free", price: "$0/mo", description: "150 daily fast tokens, standard queue, non-commercial license" },
      { tier: "Apprentice", price: "$10/mo", description: "8,500 fast tokens/mo, private generation, custom model training" },
      { tier: "Artisan", price: "$24/mo", description: "25,000 fast tokens/mo, priority queues, unlimited relaxed generation" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Phind",
    slug: "phind",
    tagline: "Search and technical problem solver built for developers",
    description: "An intelligent search and answer engine purpose-built for developers, engineers, and technical researchers.",
    longDescription: "Phind connects directly to code repositories, official API documentation, and technical forums to provide instant, detailed code solutions, bug fixes, and architectural recommendations. It eliminates endless forum digging by synthesizing verified code snippets with full explanations.",
    logoUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://phind.com",
    category: "Coding",
    pricing: "Freemium",
    rating: 4.7,
    reviewCount: 1650,
    platforms: JSON.stringify(["Web", "VS Code Extension", "macOS"]),
    features: JSON.stringify([
      "Phind-70B model fine-tuned explicitly on real-world engineering benchmarks",
      "VS Code extension for searching solutions directly alongside your editor",
      "Live web scraping of GitHub issues, StackOverflow, and library docs",
      "One-click code snippet copy with language syntax highlighting",
      "Deep pair programming mode for multi-step refactoring"
    ]),
    useCases: JSON.stringify([
      "Solving obscure framework compilation and package dependency errors",
      "Learning new programming language APIs and syntax patterns rapidly",
      "Evaluating competing libraries and SDK performance tradeoffs",
      "Writing SQL queries, regex expressions, and bash scripts"
    ]),
    tags: JSON.stringify(["Developer Search", "Code Assistant", "Technical Docs", "VS Code", "Coding"]),
    pricingPlans: JSON.stringify([
      { tier: "Free", price: "$0/mo", description: "Unlimited basic searches with Phind model, standard speed" },
      { tier: "Pro", price: "$20/mo", description: "500+ daily searches using Claude 3.5 Sonnet & GPT-4o, image uploads" },
      { tier: "Enterprise", price: "Custom", description: "Internal codebase search indexing, custom models, SSO security" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Descript",
    slug: "descript",
    tagline: "Text-based video and audio editing with AI studio sound",
    description: "All-in-one audio and video editor that makes editing as simple as editing a text document.",
    longDescription: "Descript reimagines media production by automatically transcribing audio and video files into editable text. Deleting words or sentences from the transcript instantly trims the corresponding media. With AI features like Studio Sound audio clean-up, eye contact correction, and filler word removal, producing podcasts and YouTube videos takes minutes instead of hours.",
    logoUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://descript.com",
    category: "Audio",
    pricing: "Freemium",
    rating: 4.8,
    reviewCount: 2150,
    platforms: JSON.stringify(["macOS", "Windows", "Web"]),
    features: JSON.stringify([
      "Text-based video and podcast editing with automated transcription",
      "Studio Sound: 1-click removal of room echo, background hums, and hiss",
      "Automatic removal of 'um's, 'uh's, repeated words, and awkward silences",
      "AI Eye Contact correction that redirects gaze directly to the camera",
      "Overdub: Type new words to fix verbal mistakes using your cloned voice"
    ]),
    useCases: JSON.stringify([
      "Producing professional multi-track audio podcasts with ease",
      "Repurposing long webinars into bite-sized clips for TikTok and LinkedIn",
      "Creating video product walkthroughs and educational course lessons",
      "Cleaning up noisy remote interview audio recordings"
    ]),
    tags: JSON.stringify(["Podcast Editing", "Video Editing", "Transcription", "Studio Sound", "Audio"]),
    pricingPlans: JSON.stringify([
      { tier: "Free", price: "$0/mo", description: "1 transcription hour/mo, 720p video export, basic Studio Sound" },
      { tier: "Hobbyist", price: "$12/mo", description: "10 transcription hours/mo, 1080p export, remove watermarks" },
      { tier: "Creator", price: "$24/mo", description: "30 transcription hours/mo, 4K export, advanced AI features" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Gamma",
    slug: "gamma",
    tagline: "AI presentation and webpage generator from text prompts",
    description: "AI-powered presentation, document, and webpage generator that transforms text notes into beautiful decks.",
    longDescription: "Gamma eliminates the tedious manual formatting of slide decks and presentations. By feeding it an outline, raw notes, or simple prompt, Gamma generates polished, interactive presentations with customized layouts, responsive typography, and embedded media, ready to present or publish in seconds.",
    logoUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://gamma.app",
    category: "Business",
    pricing: "Freemium",
    rating: 4.8,
    reviewCount: 1940,
    platforms: JSON.stringify(["Web"]),
    features: JSON.stringify([
      "1-click transformation of text outlines into visual slide cards",
      "Dynamic cards with adjustable layouts, nested accordions, and tabs",
      "Smart styling themes that match company brand colors and fonts",
      "Interactive embeds: Airtable, Figma, YouTube, Loom, and Google Drive",
      "Real-time analytics to track viewer slide engagement and dropoff"
    ]),
    useCases: JSON.stringify([
      "Pitch decks for startup fundraising and investor updates",
      "Sales proposals and client onboarding presentations",
      "Company all-hands briefings and strategic quarterly reviews",
      "Product requirement documents and project kick-off briefs"
    ]),
    tags: JSON.stringify(["Presentations", "Slide Decks", "Business", "Documents", "Productivity"]),
    pricingPlans: JSON.stringify([
      { tier: "Free", price: "$0/mo", description: "400 AI credits on signup, basic analytics, export to PDF" },
      { tier: "Plus", price: "$8/mo", description: "Unlimited AI creation, remove Gamma watermark, 30-day version history" },
      { tier: "Pro", price: "$15/mo", description: "Advanced AI models, custom brand fonts, detailed slide analytics" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Copy.ai",
    slug: "copy-ai",
    tagline: "GTM AI platform automating sales prospecting and content pipelines",
    description: "GTM AI platform automating sales prospecting, inbound marketing, and content operations at scale.",
    longDescription: "Copy.ai is built for modern Go-To-Market (GTM) teams. Combining generative AI with automated workflow recipes, it streamlines inbound lead qualification, competitive research, personalized sales outreach emails, and multi-platform content production without complex engineering pipelines.",
    logoUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://copy.ai",
    category: "Marketing",
    pricing: "Freemium",
    rating: 4.6,
    reviewCount: 2200,
    platforms: JSON.stringify(["Web", "API"]),
    features: JSON.stringify([
      "GTM Workflow Builder for multi-step automated content pipelines",
      "Sales email hyper-personalization using prospect LinkedIn signals",
      "Brand voice library with governance rules for team collaboration",
      "Infobase storage for instant retrieval of product value propositions",
      "Integrations with HubSpot, Salesforce, and Zapier"
    ]),
    useCases: JSON.stringify([
      "Scaling outbound sales development representative (SDR) prospecting",
      "Generating localized ad variations for global campaigns",
      "Translating product release notes into customer email digests",
      "Automating blog post outlining and social syndication"
    ]),
    tags: JSON.stringify(["Sales AI", "Marketing", "GTM", "Automation", "Content"]),
    pricingPlans: JSON.stringify([
      { tier: "Free", price: "$0/mo", description: "1 seat, 2,000 words in Chat, 200 bonus workflow credits" },
      { tier: "Pro", price: "$36/mo", description: "5 seats, unlimited words in Chat, 500 workflow credits/mo" },
      { tier: "Team", price: "$186/mo", description: "20 seats, 3,000 workflow credits/mo, custom brand voices" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Codeium",
    slug: "codeium",
    tagline: "Ultra-fast, enterprise-secure AI code autocomplete and chat",
    description: "Ultra-fast, enterprise-secure AI code autocomplete and chat companion with a generous free individual tier.",
    longDescription: "Codeium provides intelligent code acceleration for individual developers and Fortune 500 enterprises. Supporting 70+ programming languages across 40+ IDEs (VS Code, JetBrains, Eclipse, Xcode, Vim), Codeium delivers instant multi-line suggestions, repo-wide chat context, and automated unit test authoring with zero telemetry retention.",
    logoUrl: "https://images.unsplash.com/photo-1546146830-2cca9512c68e?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://codeium.com",
    category: "Developer Tools",
    pricing: "Free",
    rating: 4.8,
    reviewCount: 2750,
    platforms: JSON.stringify(["macOS", "Windows", "Linux", "Web", "API"]),
    features: JSON.stringify([
      "Ultra-fast autocomplete with sub-100ms inference latency",
      "Support for 40+ IDEs including VS Code, JetBrains, Xcode, and Vim",
      "Codeium Chat with full codebase repository awareness and context indexing",
      "Zero telemetry retention guarantee ensuring no code training on your data",
      "Enterprise on-premise air-gapped deployment option"
    ]),
    useCases: JSON.stringify([
      "Accelerating daily software development with low latency",
      "Enterprise teams requiring stringent IP security and privacy guarantees",
      "Working within specialized legacy IDEs unsupported by standard copilots",
      "Generating boilerplate unit tests and docstrings across large repos"
    ]),
    tags: JSON.stringify(["Autocomplete", "IDE Extension", "Developer Tools", "Coding", "Privacy"]),
    pricingPlans: JSON.stringify([
      { tier: "Individual", price: "$0/mo", description: "Unlimited autocomplete, chat, and multi-IDE extensions forever free" },
      { tier: "Teams", price: "$12/user/mo", description: "Centralized seat management, repo-wide context indexing, admin portal" },
      { tier: "Enterprise", price: "Custom", description: "Self-hosted deployment, air-gapped support, dedicated customer success" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Otter.ai",
    slug: "otter-ai",
    tagline: "AI meeting assistant that transcribes, summarizes, and captures slides",
    description: "AI meeting assistant that records audio, writes notes, captures slides, and generates automated summaries.",
    longDescription: "Otter.ai attends your Zoom, Google Meet, and Microsoft Teams meetings to transcribe conversations in real time. It identifies distinct speakers, highlights critical action items, captures presented slide screenshots automatically, and distributes comprehensive post-meeting executive summaries.",
    logoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://otter.ai",
    category: "Productivity",
    pricing: "Freemium",
    rating: 4.6,
    reviewCount: 2300,
    platforms: JSON.stringify(["Web", "iOS", "Android", "Chrome Extension"]),
    features: JSON.stringify([
      "Automated Zoom, Google Meet, and MS Teams meeting joiner and recorder",
      "Real-time live transcription with speaker separation and timestamping",
      "Automated slide screen-capture inserted directly alongside transcript notes",
      "Otter AI Chat to ask questions about current or historical meetings",
      "Automated email digest with summary bullet points and action items"
    ]),
    useCases: JSON.stringify([
      "Never missing key details in high-stakes sales and client calls",
      "Sharing meeting transcripts with absent team members asynchronously",
      "Tracking executive decisions and action items across recurring sprints",
      "Recording university lectures and collaborative group study sessions"
    ]),
    tags: JSON.stringify(["Meeting Assistant", "Transcription", "Productivity", "Audio", "Notes"]),
    pricingPlans: JSON.stringify([
      { tier: "Basic", price: "$0/mo", description: "300 monthly transcription minutes, 30 mins/conversation, import 3 audio files" },
      { tier: "Pro", price: "$10/mo", description: "1,200 monthly transcription minutes, 90 mins/conversation, advanced search" },
      { tier: "Business", price: "$20/user/mo", description: "6,000 monthly transcription minutes, admin analytics, team vocabulary" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Make",
    slug: "make",
    tagline: "Visual automation canvas connecting 1,500+ apps with AI modules",
    description: "Visual automation platform with native AI modules to design, build, and automate complex workflows visually.",
    longDescription: "Make lets you design, build, and automate anything from simple tasks to complex enterprise processes without writing code. With native OpenAI, Anthropic, and Hugging Face modules, users can extract unstructured data from emails, enrich CRM leads, generate personalized content, and connect over 1,500 apps with drag-and-drop ease.",
    logoUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://make.com",
    category: "Business",
    pricing: "Freemium",
    rating: 4.8,
    reviewCount: 2100,
    platforms: JSON.stringify(["Web", "API"]),
    features: JSON.stringify([
      "Drag-and-drop visual workflow canvas with unlimited branch routers",
      "Native AI connectors for OpenAI, Claude, Whisper, and Mistral",
      "Support for 1,500+ pre-built application integrations and custom webhooks",
      "Real-time execution debugger with step-by-step payload inspection",
      "Data manipulation functions for regex, JSON, math, and date formatting"
    ]),
    useCases: JSON.stringify([
      "Automated customer support ticket classification and sentiment routing",
      "Inbound lead qualification and auto-enrichment into CRM databases",
      "Synthesizing social mentions and alerting team channels via Slack",
      "Batch document generation and automated PDF invoice delivery"
    ]),
    tags: JSON.stringify(["Workflow Automation", "No Code", "Integrations", "Business", "Productivity"]),
    pricingPlans: JSON.stringify([
      { tier: "Free", price: "$0/mo", description: "1,000 operations/month, 15-minute minimum execution interval" },
      { tier: "Core", price: "$9/mo", description: "10,000 operations/month, 1-minute execution interval, unlimited active scenarios" },
      { tier: "Pro", price: "$16/mo", description: "Custom variables, full execution history search, priority scenario execution" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Lovable",
    slug: "lovable",
    tagline: "AI full-stack engineer generating production web apps",
    description: "AI full-stack engineer that generates, edits, and deploys complete web applications from plain English prompts.",
    longDescription: "Lovable is an AI-powered software engineer that turns ideas into fully functioning full-stack web applications. Built with modern React, Vite, Tailwind, and Supabase integration, Lovable creates database schemas, designs beautiful responsive interfaces, writes authentication flows, and deploys live web applications instantly.",
    logoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://lovable.dev",
    category: "Coding",
    pricing: "Freemium",
    rating: 4.8,
    reviewCount: 1540,
    platforms: JSON.stringify(["Web"]),
    features: JSON.stringify([
      "Full-stack web application generation with Supabase backend",
      "Interactive visual canvas to select and tweak UI elements directly",
      "Instant GitHub repository synchronization and 2-way code push",
      "Built-in user authentication, database storage, and edge functions",
      "1-click custom domain publishing and SSL provisioning"
    ]),
    useCases: JSON.stringify([
      "Building MVP SaaS products in hours instead of months",
      "Creating internal enterprise tools and employee dashboards",
      "Prototyping interactive client presentations with live backend data",
      "Rapidly experimenting with new web product concepts"
    ]),
    tags: JSON.stringify(["Full Stack", "App Builder", "React", "Supabase", "Coding"]),
    pricingPlans: JSON.stringify([
      { tier: "Starter", price: "$0/mo", description: "5 messages per day, public projects, community support" },
      { tier: "Pro", price: "$20/mo", description: "Unlimited messages, private projects, custom domains, GitHub sync" }
    ]),
    isFeatured: true,
    isVerified: true,
  },
  {
    name: "Consensus",
    slug: "consensus",
    tagline: "Evidence-based search over 200M+ peer-reviewed scientific papers",
    description: "AI-powered academic search engine that extracts insights directly from 200M+ peer-reviewed scientific papers.",
    longDescription: "Consensus democratizes scientific knowledge by applying AI over peer-reviewed research. When you ask a question (e.g. 'Does creatine improve cognition?'), Consensus analyzes hundreds of relevant studies, generates a Consensus Meter showing scientific agreement, and extracts concise findings with direct DOI citations.",
    logoUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://consensus.app",
    category: "Education",
    pricing: "Freemium",
    rating: 4.8,
    reviewCount: 1720,
    platforms: JSON.stringify(["Web"]),
    features: JSON.stringify([
      "Consensus Meter showing percentage agreement among peer-reviewed papers",
      "Synthesized summaries backed by 200M+ verified academic publications",
      "Study Snapshot showing sample size, methodology, and citation count",
      "Citation export to Zotero, Mendeley, and BibTeX",
      "Quality filters for RCTs, meta-analyses, and journal impact factor"
    ]),
    useCases: JSON.stringify([
      "Evidence-based medical, wellness, and nutritional research",
      "Accelerating literature reviews for graduate and PhD students",
      "Fact-checking health claims and policy arguments against scientific literature",
      "Biotech and pharmaceutical landscape discovery"
    ]),
    tags: JSON.stringify(["Academic Research", "Science", "Education", "Citations", "Peer Reviewed"]),
    pricingPlans: JSON.stringify([
      { tier: "Free", price: "$0/mo", description: "Unlimited searches, basic paper summaries, 20 Consensus Meters/mo" },
      { tier: "Premium", price: "$9/mo", description: "Unlimited Consensus Meters, GPT-4 academic synthesis, study bookmarks" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Grammarly AI",
    slug: "grammarly-ai",
    tagline: "Contextual writing assistant for tone, clarity, and communication",
    description: "Intelligent writing assistant for flawless grammar, tone calibration, and context-aware professional communication.",
    longDescription: "Grammarly AI operates across all your web and desktop applications to ensure writing is clear, mistake-free, and tone-appropriate. Going beyond simple spellchecking, Grammarly suggests rewrite alternatives, adjusts emotional tone, rewrites passive voice sentences, and drafts tailored email responses in your voice.",
    logoUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://grammarly.com",
    category: "Writing",
    pricing: "Freemium",
    rating: 4.7,
    reviewCount: 4500,
    platforms: JSON.stringify(["Web", "Windows", "macOS", "iOS", "Android", "Chrome Extension"]),
    features: JSON.stringify([
      "Context-aware grammar, spelling, and punctuation correction",
      "Tone detector and real-time stylistic clarity suggestions",
      "1-click generative rewrites for conciseness and impact",
      "Native desktop integration across Slack, Outlook, Word, and browsers",
      "Enterprise style guide enforcement and brand terminology glossary"
    ]),
    useCases: JSON.stringify([
      "Polishing executive communications and customer-facing emails",
      "Maintaining consistent grammatical accuracy across global remote teams",
      "Accelerating academic essay drafting and manuscript editing",
      "Refining resume, cover letter, and job application wording"
    ]),
    tags: JSON.stringify(["Writing", "Grammar", "Communication", "Productivity", "Editor"]),
    pricingPlans: JSON.stringify([
      { tier: "Free", price: "$0/mo", description: "Basic grammar, spelling, and punctuation checks, 100 AI prompts/mo" },
      { tier: "Premium", price: "$12/mo", description: "Full sentence rewrites, tone suggestions, plagiarism detector, 1,000 AI prompts" },
      { tier: "Business", price: "$15/user/mo", description: "Central team style guides, brand tone analytics, enterprise SSO" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Replit Agent",
    slug: "replit-agent",
    tagline: "Autonomous cloud developer building and deploying apps live",
    description: "Autonomous software agent that builds, configures, and deploys full web and backend apps from your browser.",
    longDescription: "Replit Agent combines intelligent code generation with Replit's instant cloud runtime environments. Tell it what you want to build, and the agent provisions dependencies, configures database connections, writes backend API endpoints, tests the live running app, and pushes it live with a public URL.",
    logoUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://replit.com",
    category: "Coding",
    pricing: "Paid",
    rating: 4.7,
    reviewCount: 1390,
    platforms: JSON.stringify(["Web", "iOS", "Android"]),
    features: JSON.stringify([
      "Natural language full-stack app creation inside live cloud container",
      "Autonomous package installation and environment variable configuration",
      "Real-time visual browser preview and interactive debugging",
      "Integrated PostgreSQL database provisioning in 1 click",
      "Mobile development app for triggering code changes on the go"
    ]),
    useCases: JSON.stringify([
      "Building full-stack web applications without setting up local dev environments",
      "Rapid internal tool creation for operations teams",
      "Learning web development with step-by-step AI guided scaffolding",
      "Hackathon prototyping and experimental proof-of-concept testing"
    ]),
    tags: JSON.stringify(["Cloud IDE", "Agent", "Coding", "Full Stack", "Developer Tools"]),
    pricingPlans: JSON.stringify([
      { tier: "Core", price: "$20/mo", description: "Access to Replit Agent checkpoints, unlimited private Repls, powerful cloud compute" },
      { tier: "Teams", price: "$35/user/mo", description: "Centralized billing, private cloud networking, role-based access control" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Elicit",
    slug: "elicit",
    tagline: "Automated biomedical literature reviews and data synthesis",
    description: "The AI research assistant that automates literature reviews and synthesizes scientific findings across research papers.",
    longDescription: "Elicit uses language models to help researchers analyze biomedical and scientific papers at superhuman speed. It searches across 125M+ papers from Semantic Scholar, extracts key methodologies and findings into structured comparison tables, and writes synthesis summaries for academic and clinical research.",
    logoUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://elicit.com",
    category: "Education",
    pricing: "Freemium",
    rating: 4.7,
    reviewCount: 1480,
    platforms: JSON.stringify(["Web"]),
    features: JSON.stringify([
      "Automated structured data extraction from hundreds of research PDFs",
      "Search across 125M+ academic papers even without exact keyword matches",
      "Custom column extraction: sample size, dose, duration, outcomes, limitations",
      "Synthesis summaries with citations to original paragraphs in papers",
      "Export to CSV, RIS, and BibTeX format for systematic reviews"
    ]),
    useCases: JSON.stringify([
      "Writing systematic literature reviews and meta-analyses in half the time",
      "Assessing conflicting scientific evidence in medical therapies",
      "Extracting quantitative clinical trial parameters across dozens of PDFs",
      "Staying up to date on new publications in specific scientific subfields"
    ]),
    tags: JSON.stringify(["Literature Review", "Research", "Academic", "Science", "Education"]),
    pricingPlans: JSON.stringify([
      { tier: "Basic", price: "$0/mo", description: "5,000 one-time credits, search 125M papers, extract from 4 papers at once" },
      { tier: "Plus", price: "$12/mo", description: "12,000 credits/mo, extract from up to 20 papers at once, CSV export" },
      { tier: "Pro", price: "$29/mo", description: "High-volume paper extraction, custom column definitions, priority support" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Zapier Central",
    slug: "zapier-central",
    tagline: "Autonomous AI bots connecting 6,000+ SaaS apps",
    description: "AI bot workspace where you can teach AI bots to work across 6,000+ business applications autonomously.",
    longDescription: "Zapier Central is an experimental AI workspace where you build and train custom AI bots that operate directly inside your business tools. Bots can monitor spreadsheets, respond to customer requests, trigger multi-app workflows, and take actions across Zapier's catalog of 6,000+ connected business applications.",
    logoUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://zapier.com/central",
    category: "Business",
    pricing: "Freemium",
    rating: 4.6,
    reviewCount: 1670,
    platforms: JSON.stringify(["Web"]),
    features: JSON.stringify([
      "Interactive bot trainer that learns your business rules through natural language",
      "Direct bi-directional connectivity with 6,000+ SaaS applications",
      "Live data analysis of Google Sheets, Airtable, and Notion tables",
      "Autonomous background triggers based on incoming emails and Slack messages",
      "Instant action confirmation controls for high-importance enterprise operations"
    ]),
    useCases: JSON.stringify([
      "Automating cross-tool sales pipeline updates and contract alerts",
      "Customer support triage and intelligent response drafting",
      "Inventory tracking and automated re-order purchase order creation",
      "Daily operational summaries synthesized from multiple SaaS platforms"
    ]),
    tags: JSON.stringify(["AI Bots", "Business Automation", "Zapier", "No Code", "Productivity"]),
    pricingPlans: JSON.stringify([
      { tier: "Free", price: "$0/mo", description: "Up to 3 active bots, 400 monthly actions, standard app integrations" },
      { tier: "Pro", price: "$20/mo", description: "Unlimited bots, 2,000 actions/mo, multi-step actions, priority execution" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Stable Diffusion",
    slug: "stable-diffusion",
    tagline: "Open-weights diffusion image model by Stability AI",
    description: "The groundbreaking open-weights generative image model empowering developers and artists worldwide.",
    longDescription: "Stability AI's Stable Diffusion is the open-source cornerstone of generative visual intelligence. Offering models such as SD 3.5 Large and Medium, it delivers state-of-the-art text-to-image quality, photorealistic rendering, complex multi-subject composition, and typography rendering, all while allowing unrestricted private local deployment.",
    logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://stability.ai",
    category: "Image",
    pricing: "Free",
    rating: 4.7,
    reviewCount: 3900,
    platforms: JSON.stringify(["Web", "macOS", "Windows", "Linux", "API"]),
    features: JSON.stringify([
      "SD 3.5 Large foundation model with 8 billion parameters",
      "Open weights for local offline execution on consumer GPUs",
      "ControlNet support for precise edge, pose, and depth composition guidance",
      "Extensive global ecosystem of fine-tuned community Checkpoints and LoRAs",
      "Permissive community license for personal and commercial applications"
    ]),
    useCases: JSON.stringify([
      "Custom game art pipelines and high-resolution texture generation",
      "Private enterprise visual asset generation without cloud data leakage",
      "Researching novel image synthesis algorithms and diffusion architectures",
      "Building tailored generative AI consumer applications"
    ]),
    tags: JSON.stringify(["Open Source", "Image Generation", "Diffusion", "Stability AI", "Art"]),
    pricingPlans: JSON.stringify([
      { tier: "Community License", price: "$0/mo", description: "Free for research and commercial use under $1M annual revenue" },
      { tier: "Enterprise", price: "Custom", description: "Commercial enterprise license, customized model weights, direct support" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "HeyGen",
    slug: "heygen",
    tagline: "Studio avatar video generation with 70+ language translation",
    description: "Enterprise video generation platform creating hyper-personalized AI avatar videos with voice translation.",
    longDescription: "HeyGen enables enterprise sales and marketing teams to produce studio-grade avatar videos with natural human expressions and voice translation in minutes. With custom avatar creation, AI Video Translate with automated lip-syncing in 70+ languages, and API automation, it powers global customer engagement at scale.",
    logoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://heygen.com",
    category: "Video",
    pricing: "Freemium",
    rating: 4.8,
    reviewCount: 2100,
    platforms: JSON.stringify(["Web", "API", "Chrome Extension"]),
    features: JSON.stringify([
      "Photo Avatar and Instant Avatar cloning from 2-minute smartphone video",
      "AI Video Translate with realistic voice matching and 70+ language lip-sync",
      "Interactive Streaming Avatar API for real-time video chat conversations",
      "Custom brand kit integration: fonts, colors, logos, and graphic assets",
      "Personalized video batch generation from CRM spreadsheet data"
    ]),
    useCases: JSON.stringify([
      "Personalized outbound sales outreach video campaigns at scale",
      "Localizing corporate training videos across international offices",
      "Automated e-commerce product explainer videos from product listings",
      "Delivering interactive AI customer support video agents"
    ]),
    tags: JSON.stringify(["AI Avatars", "Video Translation", "Lip Sync", "Video", "Enterprise"]),
    pricingPlans: JSON.stringify([
      { tier: "Free", price: "$0/mo", description: "1 credit, 1 instant avatar, 720p export, HeyGen watermark" },
      { tier: "Creator", price: "$29/mo", description: "15 credits/mo, fast processing, 1080p export, auto captions" },
      { tier: "Team", price: "$89/mo", description: "30 credits/mo, multi-seat workspace, 4K export, brand kit" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Tabnine",
    slug: "tabnine",
    tagline: "Air-gapped and enterprise-compliant AI code assistant",
    description: "Private, secure AI code completion assistant designed for enterprise engineering organizations.",
    longDescription: "Tabnine is the pioneering AI assistant for software developers that puts enterprise privacy and compliance first. It provides context-aware code autocomplete and chat without ever training on your proprietary code. Tabnine can run entirely locally or in your private cloud, ensuring strict compliance with financial and healthcare IP regulations.",
    logoUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://tabnine.com",
    category: "Developer Tools",
    pricing: "Freemium",
    rating: 4.5,
    reviewCount: 1890,
    platforms: JSON.stringify(["macOS", "Windows", "Linux", "VS Code", "JetBrains"]),
    features: JSON.stringify([
      "Private and air-gapped on-premise deployment options",
      "Zero data retention with zero training on your customer proprietary IP",
      "Support for leading IDEs (VS Code, IntelliJ, Eclipse, WebStorm, Android Studio)",
      "Model switching between specialized code models (Codestral, Claude, Command R)",
      "Automated unit test generation and documentation writing"
    ]),
    useCases: JSON.stringify([
      "Banking, defense, and healthcare software development with strict data governance",
      "Inline code completion across large monolithic codebases",
      "Explaining legacy internal functions to new team hires",
      "Generating boilerplate unit test suites compliant with internal guidelines"
    ]),
    tags: JSON.stringify(["Enterprise Security", "Air Gapped", "Code Autocomplete", "Developer Tools", "Privacy"]),
    pricingPlans: JSON.stringify([
      { tier: "Starter", price: "$0/mo", description: "Basic short code completions for individual software developers" },
      { tier: "Pro", price: "$12/mo", description: "Full-line code completion, natural language chat, model switching" },
      { tier: "Enterprise", price: "$39/user/mo", description: "Self-hosted deployment, custom model fine-tuning, audit logs, SSO" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Tome",
    slug: "tome",
    tagline: "AI storytelling and interactive canvas presentation builder",
    description: "Generative storytelling platform that crafts compelling, interactive presentations and sales narratives.",
    longDescription: "Tome combines a fluid, responsive digital canvas with generative AI to build multimedia presentations, product pitches, and visual stories. It creates interactive narrative cards that look stunning across mobile and desktop without the rigid layout restrictions of traditional presentation slides.",
    logoUrl: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://tome.app",
    category: "Business",
    pricing: "Freemium",
    rating: 4.6,
    reviewCount: 1530,
    platforms: JSON.stringify(["Web", "iOS"]),
    features: JSON.stringify([
      "AI presentation generator from text prompts or imported document outlines",
      "Native DALL-E image generation built directly into the slide builder",
      "Live interactive embeds: Figma, Framer, Airtable, Spline 3D, and web links",
      "Responsive layout cards that dynamically reformat for mobile viewing",
      "Real-time viewer engagement analytics and slide tracking"
    ]),
    useCases: JSON.stringify([
      "Pitching new venture ideas and startup pitch decks to angel investors",
      "Designing visual design portfolios and agency creative proposals",
      "Presenting quarterly strategic roadmaps to internal executive stakeholders",
      "Interactive employee handbook and orientation guides"
    ]),
    tags: JSON.stringify(["Storytelling", "Presentations", "Business", "Interactive", "Design"]),
    pricingPlans: JSON.stringify([
      { tier: "Free", price: "$0/mo", description: "Unlimited presentations, 500 AI generation credits on signup" },
      { tier: "Pro", price: "$16/mo", description: "Unlimited AI creation, export to PDF, custom branding and colors" },
      { tier: "Enterprise", price: "Custom", description: "Enterprise workspaces, SSO, team templates, dedicated support" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Bolt.new",
    slug: "bolt-new",
    tagline: "In-browser WebContainer development environment",
    description: "In-browser full-stack development environment powered by WebContainers to prompt, run, and deploy apps.",
    longDescription: "Bolt.new by StackBlitz is an AI-powered development sandbox that runs entire full-stack Node.js environments directly inside your web browser using WebContainers. You can prompt an AI model to scaffold a Vite, Next.js, or Svelte application, install npm packages in seconds, and run a live development server without installing anything locally.",
    logoUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://bolt.new",
    category: "Coding",
    pricing: "Freemium",
    rating: 4.9,
    reviewCount: 2890,
    platforms: JSON.stringify(["Web"]),
    features: JSON.stringify([
      "Full Node.js runtime and npm package execution inside browser WebContainers",
      "Multi-file project generation and automated dependency installation",
      "Live interactive terminal, code editor, and live browser preview pane",
      "1-click deploy to Netlify, Vercel, and GitHub repository export",
      "Direct prompt iteration with smart error recovery loop"
    ]),
    useCases: JSON.stringify([
      "Rapidly prototyping full-stack web applications without local terminal setup",
      "Reproducing and debugging software bugs in isolated sandbox environments",
      "Creating interactive code demos for technical documentation and tutorials",
      "Collaborative pair programming in an instant shared URL"
    ]),
    tags: JSON.stringify(["WebContainers", "Browser IDE", "Coding", "Full Stack", "StackBlitz"]),
    pricingPlans: JSON.stringify([
      { tier: "Free", price: "$0/mo", description: "Daily free token allowance, public projects, community support" },
      { tier: "Pro", price: "$20/mo", description: "10M tokens/month, private projects, Claude 3.5 Sonnet access, high speed" }
    ]),
    isFeatured: true,
    isVerified: true,
  },
  {
    name: "Hugging Face",
    slug: "hugging-face",
    tagline: "The open ML community and repository for models and datasets",
    description: "The premier collaborative platform and repository for open-source machine learning models and datasets.",
    longDescription: "Hugging Face is the GitHub of artificial intelligence. It hosts hundreds of thousands of open-source machine learning models, datasets, and Spaces demos for natural language processing, computer vision, audio, and robotics. With popular libraries like Transformers and Diffusers, Hugging Face powers the global open-source AI community.",
    logoUrl: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://huggingface.co",
    category: "Developer Tools",
    pricing: "Freemium",
    rating: 4.9,
    reviewCount: 4800,
    platforms: JSON.stringify(["Web", "API", "CLI"]),
    features: JSON.stringify([
      "Over 1,000,000 open-source models available for download and fine-tuning",
      "Hugging Face Spaces for hosting interactive Gradio and Streamlit demos",
      "Serverless and dedicated Inference Endpoints for 1-click cloud API deployment",
      "Standardized Transformers, Datasets, and Accelerate Python libraries",
      "Open LLM Leaderboard for transparent model benchmarking"
    ]),
    useCases: JSON.stringify([
      "Discovering and downloading pre-trained open weights for private AI hosting",
      "Collaborating on fine-tuning domain-specific language and vision models",
      "Publishing interactive ML demos to demonstrate scientific research papers",
      "Deploying scalable production inference endpoints on NVIDIA GPUs"
    ]),
    tags: JSON.stringify(["Open Source", "ML Repository", "Transformers", "Leaderboard", "Developer Tools"]),
    pricingPlans: JSON.stringify([
      { tier: "Free", price: "$0/mo", description: "Unlimited public models, datasets, standard CPU Spaces" },
      { tier: "PRO", price: "$9/mo", description: "Early access to features, zero wait times, GPU discounts, PRO badge" },
      { tier: "Enterprise Hub", price: "$20/user/mo", description: "SSO, enterprise security, audit logs, private model storage" }
    ]),
    isFeatured: true,
    isVerified: true,
  },
  {
    name: "Writesonic",
    slug: "writesonic",
    tagline: "AI SEO content writer and marketing copy generator",
    description: "AI writing and SEO content optimization platform for generating high-ranking articles and marketing copy.",
    longDescription: "Writesonic is an AI content engine built for marketing agencies, content creators, and SEO strategists. Leveraging real-time Google search data and GPT-4o, Writesonic produces factual, up-to-date long-form articles, competitor-analyzed landing page copy, and social media content engineered to capture high search rankings.",
    logoUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://writesonic.com",
    category: "Writing",
    pricing: "Freemium",
    rating: 4.5,
    reviewCount: 1780,
    platforms: JSON.stringify(["Web", "Chrome Extension", "API"]),
    features: JSON.stringify([
      "AI Article Writer 6.0 generating factual 3,000-word articles with real citations",
      "Chatsonic: conversational search assistant powered by real-time Google data",
      "SEO checker and keyword density optimizer integrated into the editor",
      "Automated internal linking recommendations based on your sitemap",
      "1-click export to WordPress, Shopify, and Ghost CMS platforms"
    ]),
    useCases: JSON.stringify([
      "Publishing authoritative long-form SEO blog posts that rank on Google",
      "Drafting e-commerce product descriptions and benefit bullet points",
      "Generating PPC ad copy variations for Google Ads and Facebook Ads",
      "Rephrasing existing marketing articles to enhance clarity and engagement"
    ]),
    tags: JSON.stringify(["SEO Writing", "Copywriting", "Blog Articles", "Marketing", "Content"]),
    pricingPlans: JSON.stringify([
      { tier: "Free", price: "$0/mo", description: "10,000 words/month, standard quality, 1-click WordPress export" },
      { tier: "Chatsonic", price: "$12/mo", description: "Unlimited chat queries, Google search integration, image generation" },
      { tier: "Individual", price: "$16/mo", description: "Unlimited words, Article Writer 6.0, complete SEO optimizer" }
    ]),
    isFeatured: false,
    isVerified: true,
  },
  {
    name: "Canva Magic Studio",
    slug: "canva-magic-studio",
    tagline: "All-in-one AI graphic design and visual creative suite",
    description: "All-in-one AI creative suite integrated directly into Canva's intuitive graphic design platform.",
    longDescription: "Canva Magic Studio brings the power of artificial intelligence to Canva's design ecosystem. With tools like Magic Switch to reformat designs across social platforms, Magic Expand to extend photo backgrounds, and Magic Media for text-to-image and text-to-video generation, creating professional visual content is fast and effortless.",
    logoUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=128&h=128&fit=crop&crop=faces",
    websiteUrl: "https://canva.com/magic-studio",
    category: "Design",
    pricing: "Freemium",
    rating: 4.8,
    reviewCount: 4900,
    platforms: JSON.stringify(["Web", "macOS", "Windows", "iOS", "Android"]),
    features: JSON.stringify([
      "Magic Switch: Transform presentations into executive summaries or blog posts",
      "Magic Grab: Select and isolate any element in a photograph to reposition it",
      "Magic Expand: Automatically extend photos beyond their original crop boundaries",
      "Magic Media: Built-in text-to-image and text-to-video generator",
      "Magic Animate: Apply cohesive cinematic animations across entire slide decks"
    ]),
    useCases: JSON.stringify([
      "Designing branded social media graphics and marketing collateral",
      "Creating interactive presentations and pitch decks with animated slides",
      "Retouching e-commerce product photography with AI background removal",
      "Transforming long presentations into multi-channel marketing campaigns"
    ]),
    tags: JSON.stringify(["Graphic Design", "Magic Studio", "Social Media", "Canva", "Visuals"]),
    pricingPlans: JSON.stringify([
      { tier: "Free", price: "$0/mo", description: "50 lifetime uses of Magic Media, thousands of free templates" },
      { tier: "Pro", price: "$15/mo", description: "Unlimited Magic Switch, background remover, 500 AI credits/mo, brand kit" },
      { tier: "Teams", price: "$10/user/mo", description: "Central team brand controls, approval workflows, shared design assets" }
    ]),
    isFeatured: false,
    isVerified: true,
  }
];

async function main() {
  console.log("Seeding PostgreSQL database for AI Orbit...");

  // Clean existing tables
  await prisma.favorite.deleteMany({});
  await prisma.toolSubmission.deleteMany({});
  await prisma.tool.deleteMany({});
  await prisma.user.deleteMany({});
  console.log("Cleared existing data.");

  // Seed test user with hashed password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("Password123!", salt);

  const demoUser = await prisma.user.create({
    data: {
      name: "Himanshu Gupta",
      email: "demo@aiorbit.club",
      passwordHash,
      role: "user",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=faces",
    },
  });
  console.log("Seeded demo user:", demoUser.email);

  // Seed Tools
  let cursorToolId = "";
  for (const tool of toolsData) {
    const created = await prisma.tool.create({
      data: tool,
    });
    if (tool.slug === "cursor") {
      cursorToolId = created.id;
    }
  }
  console.log(`Seeded ${toolsData.length} tools into PostgreSQL.`);

  // Seed initial favorite for demo user
  if (cursorToolId) {
    await prisma.favorite.create({
      data: {
        userId: demoUser.id,
        toolId: cursorToolId,
      },
    });
    console.log("Seeded initial favorite (Cursor) for demo user.");
  }
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
