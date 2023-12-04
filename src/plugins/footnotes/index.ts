import { FeatureProvider, FloatingToolbarSectionEntry, FloatingToolbarSection } from '@payloadcms/richtext-lexical';
import { FootnoteIcon } from './icon';
import FootnotePlugin, { TOGGLE_FOOTNOTE_MODAL_COMMAND, ModalMode } from './plugins';

export const SectionWithEntries = (entries: FloatingToolbarSectionEntry[]): FloatingToolbarSection => {
    return {
        entries,
        key: 'footnote',
        order: 1,
        type: 'buttons',
    };
};
export const FootnoteFeature = (props: {}): FeatureProvider => {
    return {
        feature: () => {
            return {
                floatingSelectToolbar: {
                    sections: [
                        SectionWithEntries([
                            {
                                ChildComponent: FootnoteIcon,
                                isActive: () => false,
                                isEnabled: ({ selection }) => {
                                    if (!selection || !selection?.getNodes()?.length) {
                                        return false;
                                    }
                                },
                                key: 'footnote',
                                label: `Insert Footnote`,
                                onClick: ({ editor }) => {
                                    editor.dispatchCommand(TOGGLE_FOOTNOTE_MODAL_COMMAND, {
                                        open: true,
                                        mode: ModalMode.INSERT,
                                    });
                                },
                            },
                        ]),
                    ],
                },
                plugins: [
                    {
                        Component: FootnotePlugin,
                        position: 'normal',
                    },
                ],
                props,
            };
        },
        key: 'footnote',
    };
};
