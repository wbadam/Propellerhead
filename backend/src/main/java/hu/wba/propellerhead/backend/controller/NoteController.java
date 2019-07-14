package hu.wba.propellerhead.backend.controller;

import hu.wba.propellerhead.backend.models.Note;
import hu.wba.propellerhead.backend.models.dto.NoteUpdateRequest;
import hu.wba.propellerhead.backend.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin("http://localhost:3000")
public class NoteController {

    private final NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("/customers/{id}/notes")
    public List<Note> getNotes(@PathVariable("id") UUID customerId) {
        return noteService.getNotesByCustomerId(customerId);
    }

    @PostMapping("/customers/{id}/notes")
    public Note addNote(@PathVariable("id") UUID customerId, @RequestBody NoteUpdateRequest note) {
        return noteService.addNote(customerId, note.getContent());
    }

    @PutMapping("/notes/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable UUID id, @RequestBody NoteUpdateRequest note) {
        return ResponseEntity.of(noteService.updateNote(id, note.getContent()));
    }

    @DeleteMapping("/notes/{id}")
    public void deleteNote(@PathVariable UUID id) {
        noteService.deleteNote(id);
    }
}
