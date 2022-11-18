import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import path from 'path';

export const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: '**/*.md',
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
        article._raw.flattenedPath.split(path.sep).slice(0, -1),
    },
    slug: {
      type: 'string',
      resolve: (article) => path.basename(article._raw.flattenedPath),
    },
  },
}));

export default makeSource({
  contentDirPath: 'articles',
  contentDirExclude: ['drafts'],
  documentTypes: [Article],
  fieldOptions: {},
  markdown: (builder) => {
    builder
      .use(remarkFrontmatter)
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeHighlight)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings)
      .use(rehypeStringify);
  },
});