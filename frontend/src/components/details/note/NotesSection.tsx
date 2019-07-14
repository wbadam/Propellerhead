import React, {useEffect, useState} from 'react';
import api from "../../../Api";
import {Note} from "../../../model/Note";
import NoteComponent from "./Note";
import {Button, Container, Header} from "semantic-ui-react";

interface Props {
    customerId: string;
}

const NotesSection: React.FunctionComponent<Props> = (props) => {
    const {customerId} = props;
    const [notes, setNotes] = useState<Note[]>([]);

    // Fetch notes
    useEffect(() => {
        api.get("/customers/" + customerId + "/notes").then(response => setNotes(response.data));
    }, [customerId]);

    const addNote = () => {
        let note: Note = {
            id: '',
            content: '',
        };
        setNotes([...notes, note])
    };

    // TODO placeholder

    return(
        <Container>
            <Header>Notes</Header>
            {notes.map((note, index) => (
                <NoteComponent key={note.id || index} id={note.id} customerId={customerId} content={note.content}/>
            ))}

            <Button icon={"plus"} onClick={addNote}/>
        </Container>
    )
};

export default NotesSection;
