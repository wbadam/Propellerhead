package hu.wba.propellerhead.backend.services;

import hu.wba.propellerhead.backend.models.Note;
import hu.wba.propellerhead.backend.repositories.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    @Autowired
    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public List<Note> getNotesByCustomerId(UUID customerId) {
        return noteRepository.findByCustomerId(customerId);
    }

    public Note addNote(UUID customerId, String content) {
        Note note = new Note();
        note.setCustomerId(customerId);
        note.setContent(content);

        return noteRepository.save(note);
    }

    public Optional<Note> updateNote(UUID id, String content) {
        return noteRepository.findById(id).map(note -> {
            note.setContent(content);
            return note;
        }).map(noteRepository::save);
    }

    public void deleteNote(UUID id) {
        noteRepository.deleteById(id);
    }
}
