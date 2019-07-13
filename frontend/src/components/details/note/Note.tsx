import React, {useState} from 'react'
import {Segment} from "semantic-ui-react";
import NoteEditContent from "./NoteEditContent";
import NoteViewContent from "./NoteViewContent";
import api from "../../../Api";

type Mode = "edit" | "view";

interface Props {
    id?: string;
    customerId: string;
    content: string;
}

const Note: React.FunctionComponent<Props> = (props: Props) => {
    const {customerId} = props;

    const [mode, setMode] = useState<Mode>(props.id && "view" || "edit");
    const [id, setId] = useState(props.id);
    const [content, setContent] = useState(props.content);

    const saveNote = (content: string) => {
        id ? updateNote(content) : addNote(content);
    };

    const addNote = (content: string) => {
        api.post("/customers/" + customerId + "/notes", {content}).then(response => {
            setId(response.data.id);
            setContent(response.data.content);
            setMode("view");
        })
    };

    const updateNote = (content: string) => {
        api.put("/notes/" + id, {content}).then(response => {
            setContent(response.data.content);
            setMode("view");
        })
    };

    const renderNoteView = (mode: Mode) => {
        if (mode === "view") {
            return <NoteViewContent content={content} onEditClicked={() => setMode("edit")}/>
        } else {
            return <NoteEditContent content={content} onSave={(content: string) => new Promise(() => saveNote(content))}/>;
        }
    };

    return (
        <Segment>
            {renderNoteView(mode)}
        </Segment>
    )
};

export default Note;
