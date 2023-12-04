import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Modal } from "@faceless-ui/modal";
import { Form, Submit } from "payload/components/forms";
import { MinimalTemplate, Button, X } from "payload/components";
import * as React from "react";
import { useEffect } from "react";
import RichText from "payload/dist/admin/components/forms/field-types/RichText";
import {
  lexicalEditor,
  LinkFeature,
  ItalicTextFeature,
  BoldTextFeature,
} from "@payloadcms/richtext-lexical";

import { TOGGLE_FOOTNOTE_MODAL_COMMAND, ModalMode } from "../plugins";
import "./index.scss";

export const BASE_CLASS = "footnote-rich-text-button";
export const MODAL_SLUG = "footnote-modal";

type CustomModalProps = {
  mode: ModalMode;
};

export const CustomModal = ({ mode = ModalMode.INSERT }: CustomModalProps) => {
  const [editor] = useLexicalComposerContext();
  const header =
    mode === ModalMode.INSERT ? "Insert Footnote" : "Edit Footnote";
  const handleClose = () => {
    editor.focus();
    editor.dispatchCommand(TOGGLE_FOOTNOTE_MODAL_COMMAND, { open: false });
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <Modal slug={MODAL_SLUG} className={`${BASE_CLASS}__modal`}>
      <MinimalTemplate className={`${BASE_CLASS}__template`} width="wide">
        <header className={`${BASE_CLASS}__header`}>
          <h3>{header}</h3>
          <Button buttonStyle="none" onClick={handleClose}>
            <X />
          </Button>
        </header>
        <Form>
          <RichText
            name="footnote"
            label="Footnote"
            editor={lexicalEditor({
              features: [
                LinkFeature({}),
                ItalicTextFeature(),
                BoldTextFeature(),
              ],
            })}
            type="richText"
            admin={{
              className: `${BASE_CLASS}__rich-text`,
            }}
          />
          <Submit>Submit</Submit>
        </Form>
      </MinimalTemplate>
    </Modal>
  );
};
