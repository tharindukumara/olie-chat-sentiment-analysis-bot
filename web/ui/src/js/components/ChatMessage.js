import React from 'react';
import { Avatar, Chat } from '@fluentui/react-northstar'
import ChatMessageWrapper from './ChatMessageWrapper';

export async function delay(timeout) {
    await new Promise(r => setTimeout(r, timeout));
}

export async function createChatMessage(props) {
    if (props.delay) {
        var timeout = props.timeout != null ? props.timeout : 1000;
        await delay(timeout);
    }

    var chatMsgObj = {
        message: (
            <Chat.Message
                content={
                    <ChatMessageWrapper
                        loader={props.loader != null ? props.loader : true}
                        content={props.content} />
                }
                author={props.author != null ? props.author : "Olie"}
                mine={props.mine ? props.mine : false} />
        ),
        contentPosition: props.contentPosition != null ? props.contentPosition : "start",
        attached: props.attached != null ? props.attached : true,
        key: props.key != null ? props.key : null,
    };

    if (props.avatar != null) {
        chatMsgObj.gutter = <Avatar image={props.avatar} />
    }

    return chatMsgObj;
}