import { MDXProvider } from "@mdx-js/react";
import PostEditor from "@/components/post/post-editor";

const components = {};

export default function PostEditorPage() {
  return (
    <MDXProvider components={components}>
      <PostEditor />
    </MDXProvider>
  );
}
