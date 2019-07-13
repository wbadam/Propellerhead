import React from 'react';
import styles from "./NoteViewContent.module.scss";
import {Button} from "semantic-ui-react";

interface Props {
    content: string;
    onEditClicked: () => void;
}

const NoteViewContent: React.FunctionComponent<Props> = (props) => {
    const {content, onEditClicked} = props;

    return (
        <div className={styles.viewContent}>
            <div>{content}</div>
            <Button icon={"edit"} onClick={onEditClicked}/>
        </div>
    )
};

export default NoteViewContent;
