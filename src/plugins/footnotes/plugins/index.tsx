'use client';
import * as React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical';
import { useEffect, useState, useRef } from 'react';
import { useModal } from '@faceless-ui/modal';
import { mergeRegister } from '@lexical/utils';
import { CustomModal, MODAL_SLUG } from '../modal';

export const INSERT_FOOTNOTE_COMMAND = createCommand('INSERT_FOOTNOTE_COMMAND');
export const EDIT_FOOTNOTE_COMMAND = createCommand('EDIT_FOOTNOTE_COMMAND');
export const TOGGLE_FOOTNOTE_MODAL_COMMAND = createCommand('TOGGLE_FOOTNOTE_MODAL_COMMAND');

export enum ModalMode {
    INSERT = 'insert',
    EDIT = 'edit',
}

export type ModalState = {
    open: boolean;
    mode: ModalMode;
};

export const useModalState = () => {
    const [isOpen, setIsOpen] = useState(false);
    const modalState = useRef<ModalState>({
        open: false,
        mode: ModalMode.INSERT,
    });

    return { isOpen, setIsOpen, modalState };
};

export default function FootnotePlugin(): JSX.Element | null {
    const [editor] = useLexicalComposerContext();
    const { openModal, closeModal } = useModal();
    const { isOpen, setIsOpen, modalState } = useModalState();

    useEffect(() => {
        if (isOpen) {
            openModal(MODAL_SLUG);
        } else {
            closeModal(MODAL_SLUG);
        }
    }, [isOpen]);

    useEffect(() => {
        return mergeRegister(
            editor.registerCommand(
                TOGGLE_FOOTNOTE_MODAL_COMMAND,
                (payload: ModalState) => {
                    modalState.current = { ...modalState.current, ...payload };
                    setIsOpen(payload.open);
                    return true;
                },
                COMMAND_PRIORITY_EDITOR,
            ),
        );
    }, []);

    return (
        modalState.current.open && (
            <CustomModal
                mode={modalState.current.mode}
            />
        )
    );
}
