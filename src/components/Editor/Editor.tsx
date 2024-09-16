import cx from "classnames";

import { CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { TRANSFORMERS } from "@lexical/markdown";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ToolbarPlugin } from "./plugins/ToolbarPlugin";
import { isValidUrl } from "./utils/url";
import { ActionsPlugin } from "./plugins/Actions";
import { AutoLinkPlugin } from "./plugins/AutoLink";
import { EditLinkPlugin } from "./plugins/EditLink";
import { FloatingMenuPlugin } from "./plugins/FloatingMenu";
import { LocalStoragePlugin } from "./plugins/LocalStorage";
import { OpenLinkPlugin } from "./plugins/OpenLink";
import {
  EditorHistoryStateContext,
  useEditorHistoryState,
} from "./context/EditorHistoryState";
import theme from "./theme";
import './Editor.less'
export const EDITOR_NAMESPACE = "lexical-editor";

const EDITOR_NODES = [
  AutoLinkNode,
  CodeNode,
  HeadingNode,
  LinkNode,
  ListNode,
  ListItemNode,
  QuoteNode,
];

type EditorProps = {
  className?: string;
};

export function Editor(props: EditorProps) {
  const content = localStorage.getItem(EDITOR_NAMESPACE);

  return (
    <div
      id="editor-wrapper"
      className={cx(
        props.className,
        "relative prose prose-slate prose-p:my-0 prose-headings:mb-4 prose-headings:mt-2"
      )}
    >
      <EditorHistoryStateContext>
        <LexicalEditor
          config={{
            namespace: EDITOR_NAMESPACE,
            nodes: EDITOR_NODES,
            editorState: content,
            theme: theme,
            onError: (error) => {
              console.log(error);
            },
          }}
        />
      </EditorHistoryStateContext>
    </div>
  );
}

type LexicalEditorProps = {
  config: Parameters<typeof LexicalComposer>["0"]["initialConfig"];
};

export function LexicalEditor(props: LexicalEditorProps) {
  const { historyState } = useEditorHistoryState();

  return (
    <LexicalComposer initialConfig={props.config}>
        <ToolbarPlugin></ToolbarPlugin>
      <RichTextPlugin
        contentEditable={<ContentEditable spellCheck={false} />}
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin externalHistoryState={historyState} />
      <LocalStoragePlugin namespace={EDITOR_NAMESPACE} />
    </LexicalComposer>
  );
}

const Placeholder = () => {
  return (
     <span> Start writing...</span>
  );
};
