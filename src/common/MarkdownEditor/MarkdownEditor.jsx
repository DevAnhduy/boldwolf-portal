import React, {useState, useEffect} from 'react';
import './MarkdownEditor.scss';
import MdParser from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { message } from 'antd';
import { MESSAGE_ERROR } from '../../utils/constant';
import api from '../../api/index.api';
import { getLinkImg } from '../../utils/function.utils';
import TurndownService from 'turndown';

const turndownService = new TurndownService();

export const MarkdownEditor = ({
    token,
    onChange,
    initValue
}) => {
    const mdParser = new MdParser();

    const [initValueState, setInitValueState] = useState('');

    useEffect(() => {
        const mdInitValue = turndownService.turndown(initValue);

        setInitValueState(mdInitValue)
    }, [initValue])

    const onUploadImg = (file, cb) => {
        try {
            const value = file
            api.uploadApi.uploadImg({
                token,
                data: value
            })
                .then((rs) => cb(getLinkImg(rs.main)))
        } catch (err) {
            message.error(MESSAGE_ERROR)
        }
    }
    const handleOnChange = ({ text, html }) => {
        setInitValueState(text);
        onChange(html)
    }

    return (
        <MdEditor 
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleOnChange}
            onImageUpload={onUploadImg}
            value={initValueState}
            defaultValue={initValueState}
        />
    )
}