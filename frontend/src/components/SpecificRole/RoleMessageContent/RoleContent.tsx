import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import { Role } from '../../../types';
import { RoleContentStyles } from '../styles/RoleContentStyles';

interface Props {
  data: Role;
  updateRole: boolean;
  copyOnClick: (string: string) => void;
  setUpdatedRoleContent: React.Dispatch<React.SetStateAction<string>>;
}

const RoleContent = ({ data, updateRole, copyOnClick, setUpdatedRoleContent }: Props) => {
  const [textFromStorage, setTextFromStorage] = useState('');
  const content = data.content.slice(0, 60) + '...';

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        hardBreak: false
      })
    ],
    editable: updateRole,
    content: content,
    onUpdate({ editor }) {
      const content = editor.getHTML();
      const textOnlyContent = editor.getText();

      localStorage.setItem(data.role_id, textOnlyContent);

      setUpdatedRoleContent(content);
    }
  });

  useEffect(() => {
    if (editor?.isEditable) {
      editor.commands.setContent(data.content);
    }

    const textContent = localStorage.getItem(data.role_id);

    if (textContent) {
      setTextFromStorage(textContent);
    }

  }, [data.content, data.role_id, editor]);

  if (!editor) return null;

  return (
    <RoleContentStyles>
      <>
        {!updateRole &&
          <p onClick={() => copyOnClick(textFromStorage)}>
            <strong>Description</strong><br></br>
            {editor.getText().slice(0, 60) + '...'}
          </p>
        }
        {updateRole &&
          <>
            <div className="noteEditorButtons">
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                  !editor.can()
                    .chain()
                    .focus()
                    .toggleBold()
                    .run()
                }
                className={editor.isActive('bold') ? 'is-active' : ''}
              >
                B
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                  !editor.can()
                    .chain()
                    .focus()
                    .toggleItalic()
                    .run()
                }
                className={editor.isActive('italic') ? 'is-active' : ''}
              >
                I
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                disabled={
                  !editor.can()
                    .chain()
                    .focus()
                    .toggleBulletList()
                    .run()
                }
                className={editor.isActive('bulletList') ? 'is-active' : ''}
              >
                L
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive('heading') ? 'is-active' : ''}
              >
                H
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
              >
                U
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
              >
                R
              </button>
            </div>
            <EditorContent editor={editor} />
          </>
        }
      </>
    </RoleContentStyles>
  );
};

export { RoleContent };