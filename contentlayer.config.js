import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';
import remarkFigureCaption from '@microflash/remark-figure-caption';
import rehypeStringify from 'rehype-stringify';
import rehypeKatex from 'rehype-katex';
// import rehypeMathJax from 'rehype-mathjax';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeCodeTitles from 'rehype-code-titles';

import path from 'path';

import Config from './src/config';

export const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: 'articles/**/*.md',
  contentType: 'markdown',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the article',
      required: true,
    },
    subtitle: {
      type: 'string',
    },
    date: {
      type: 'date',
      description: 'The date of the article',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
    },
    published: {
      type: 'boolean',
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (article) =>
        `/articles/${path.basename(article._raw.flattenedPath)}`,
    },
    paths: {
      type: 'string[]',
      resolve: (article) => article._raw.flattenedPath.split(path.sep),
    },
    categories: {
      type: 'string[]',
      resolve: (article) =>
        article._raw.flattenedPath.split(path.sep).slice(1, -1),
    },
    slug: {
      type: 'string',
      resolve: (article) => path.basename(article._raw.flattenedPath),
    },
  },
}));

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/**/*.md',
  contentType: 'markdown',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
    },
    url: {
      type: 'string',
    },
    image: {
      type: 'string',
    },
    published: {
      type: 'boolean',
    },
  },
}));

export default makeSource({
  contentDirPath: 'documents',
  contentDirExclude: ['*/drafts', 'templates', '.obsidian', '.gitignore'],
  documentTypes: [Article, Project],
  fieldOptions: {},
  markdown: (builder) => {
    builder
      .use(remarkFrontmatter)
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkFigureCaption)
      .use(remarkMath)
      .use(remarkToc, { heading: Config.tableOfContents.label })
      .use(remarkRehype, {
        allowDangerousHtml: true,
        footnoteLabel: '각주',
        footnoteBackLabel: '본문으로 돌아가기',
      })
      // .use(rehypeMathJax)
      .use(rehypeKatex, { strict: false })
      .use(rehypeRaw)
      .use(rehypeCodeTitles)
      .use(rehypeHighlight)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, { behavior: 'append' })
      .use(rehypeStringify);
  },
});
