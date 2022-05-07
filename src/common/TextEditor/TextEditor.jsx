import React, { useEffect, useState } from 'react';
import './TextEditor.scss';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import { EDITOR_BLOCK_TYPE, EDITOR_INLINE_STYLE } from '../../utils/constant';
import { StyleButton } from './components/StyleButton';
import draftToHtml from 'draftjs-to-html';

const TextEditor = ({ placeholder = "Nhập nội dung", onChange, initialValues }) => {
    const [content, setContent] = useState(() => EditorState.createEmpty());

    useEffect(() => {
        const contentRaw = convertToRaw(content.getCurrentContent());

        const contentHTML = draftToHtml(contentRaw)

        onChange && onChange(contentHTML);

    }, [content, onChange])

    useEffect(() => {
        if(initialValues) {
            const contentState = ContentState.createFromBlockArray(convertFromHTML(initialValues));
            setContent(() => EditorState.createWithContent(contentState));
        }
        else {
            setContent(() => EditorState.createEmpty());
        }
    },[initialValues])


    const handleKeyCommand = command => {
        const newState = RichUtils.handleKeyCommand(command);
        if(newState) {
            setContent(newState);
            return true;
        }
        return false
    }

    const inlineStyle = type => setContent(RichUtils.toggleInlineStyle(content,type))
    
    const blockStyle = type => setContent(RichUtils.toggleBlockType(content,type))

    const selection = content.getSelection();

    const blockType = content
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
                  
    const inlineType = content.getCurrentInlineStyle()

    return (
        <div className="RichEditor-root">
            <div className="RichEditor-controls">
                {
                    EDITOR_BLOCK_TYPE.map(type => 
                        <StyleButton 
                            onClick={() => blockStyle(type.style)}
                            label={type.label}
                            active={type.style === blockType ? true : false}
                        />
                    )
                }
            </div>
            <div className="RichEditor-controls">
                {
                    EDITOR_INLINE_STYLE.map(type => 
                        <StyleButton 
                            onClick={() => inlineStyle(type.style)}
                            label={type.label}
                            active={inlineType.has(type.style) ? true: false}
                        />
                    )
                }
            </div>
            <Editor editorState={content}
                    onChange={setContent} 
                    handleKeyCommand={handleKeyCommand}
                    placeholder={placeholder}
            />
        </div>
    )
}

export default TextEditor;