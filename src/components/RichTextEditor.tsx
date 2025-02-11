import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';

interface RichTextEditorProps {
  content: {
    text: string;
    html: string;
  };
  onChange: (content: { text: string; html: string }) => void;
}

export const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        code: false,
        codeBlock: false,
        blockquote: false,
      }),
      Bold,
      Italic,
    ],
    content: content.html,
    onUpdate: ({ editor }) => {
      onChange({
        text: editor.getText(),
        html: editor.getHTML(),
      });
    },
  });

  return (
    <div className="border rounded-md p-4">
      <div className="flex gap-2 mb-4 border-b pb-2">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded ${
            editor?.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'
          }`}
          type="button"
        >
          太字
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded ${
            editor?.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'
          }`}
          type="button"
        >
          斜体
        </button>
      </div>
      <EditorContent 
        editor={editor} 
        className="h-[400px] [&_.ProseMirror]:h-full [&_.ProseMirror]:w-full [&_.ProseMirror]:outline-none [&_.ProseMirror]:p-0"
      />
    </div>
  );
};
