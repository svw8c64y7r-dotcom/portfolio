import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Tag, 
  ArrowRight, 
  X, 
  Terminal, 
  CheckCircle2, 
  Copy, 
  Check, 
  Shield, 
  Share2
} from 'lucide-react';
import { blogPostsData, BlogPost } from '../data/blogPosts';

export const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  const categories = ['All', 'VAPT', 'SOC', 'DFIR', 'GRC'];

  const filteredPosts = blogPostsData.filter(post => {
    if (selectedCategory === 'All') return true;
    return post.category === selectedCategory;
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'VAPT': return 'bg-purple-500/15 text-purple-300 border-purple-500/40';
      case 'SOC': return 'bg-cyber-blue/15 text-cyber-blue border-cyber-blue/40';
      case 'DFIR': return 'bg-cyber-green/15 text-cyber-green border-cyber-green/40';
      case 'GRC': return 'bg-amber-400/15 text-amber-300 border-amber-400/40';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  return (
    <section id="blog" className="py-20 bg-[#110720] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
              <span>TECHNICAL RESEARCH & WRITE-UPS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Cybersecurity Blog & Research
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-mono">
              In-depth technical walkthroughs, attack recreation methodologies, detection engineering rules, and digital forensic teardowns.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none self-start md:self-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-neon-purple'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setReadingPost(post)}
              className="rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-purple-500/50 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer group shadow-xl backdrop-blur-md"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      {post.publishedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyber-blue" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-display text-white group-hover:text-purple-300 transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/10">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] font-mono text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">By {post.author}</span>
                <span className="text-purple-400 font-bold flex items-center gap-1 group-hover:text-purple-300">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Full Article Reader Modal */}
        {readingPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#110720] border border-white/20 rounded-2xl shadow-2xl overflow-y-auto font-sans flex flex-col">
              
              {/* Reader Header */}
              <div className="sticky top-0 bg-[#110720]/98 backdrop-blur px-6 py-4 border-b border-white/10 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border ${getCategoryColor(readingPost.category)}`}>
                    {readingPost.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {readingPost.publishedDate} • {readingPost.readTime}
                  </span>
                </div>
                <button
                  onClick={() => setReadingPost(null)}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Reader Content */}
              <div className="p-6 sm:p-8 space-y-6 text-slate-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white leading-tight">
                    {readingPost.title}
                  </h1>
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mt-2">
                    <span>Written by {readingPost.author}</span>
                    <span>•</span>
                    <span>Verified Practical Research</span>
                  </div>
                </div>

                {/* Introduction */}
                <div className="p-4 bg-white/5 border-l-4 border-purple-500 rounded-r-xl text-sm leading-relaxed text-slate-200 italic font-sans">
                  {readingPost.content.introduction}
                </div>

                {/* Article Sections */}
                {readingPost.content.sections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-3 pt-2">
                    <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                      <span className="text-purple-400 font-mono text-sm">0{sIdx + 1}.</span>
                      <span>{section.heading}</span>
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed font-sans">
                      {section.body}
                    </p>

                    {/* Syntax-Highlighted Code Block with Copy */}
                    {section.codeSnippet && (
                      <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/80">
                        <div className="flex items-center justify-between px-4 py-1.5 bg-white/5 border-b border-white/10 text-[11px] font-mono text-slate-400">
                          <span>Language: {section.codeSnippet.language}</span>
                          <button
                            onClick={() => handleCopyCode(section.codeSnippet!.code, `snippet-${sIdx}`)}
                            className="flex items-center gap-1 hover:text-white text-slate-400 transition-colors"
                          >
                            {copiedSnippetId === `snippet-${sIdx}` ? (
                              <>
                                <Check className="w-3 h-3 text-cyber-green" />
                                <span className="text-cyber-green">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 text-xs font-mono text-cyber-green overflow-x-auto whitespace-pre leading-relaxed">
                          {section.codeSnippet.code}
                        </pre>
                      </div>
                    )}

                    {section.callout && (
                      <div className="p-3 bg-purple-950/40 border border-purple-500/30 rounded-xl text-xs font-mono text-purple-300">
                        💡 {section.callout}
                      </div>
                    )}
                  </div>
                ))}

                {/* Takeaway / Remediation */}
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyber-green mb-2">
                    Key Defensive Takeaway & Mitigation:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 bg-white/5 p-4 rounded-xl border border-white/10 leading-relaxed font-sans">
                    {readingPost.content.remediationOrTakeaway}
                  </p>
                </div>
              </div>

              {/* Reader Footer */}
              <div className="sticky bottom-0 bg-[#110720]/98 backdrop-blur px-6 py-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Category: {readingPost.category}</span>
                <button
                  onClick={() => setReadingPost(null)}
                  className="px-5 py-2 rounded-xl text-xs font-mono font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Close Reader
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

