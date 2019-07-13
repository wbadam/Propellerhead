package hu.wba.propellerhead.backend.services;

import hu.wba.propellerhead.backend.models.Note;
import hu.wba.propellerhead.backend.repositories.NoteRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class NoteServiceTests {

    @Mock
    private NoteRepository noteRepository;

    @InjectMocks
    private NoteService noteService;

    @Test
    public void getNotesByCustomerIdFetchesCustomer() {
        UUID customerId = UUID.fromString("957c0997-5431-423d-9394-b0ae8ffb941c");

        Note note = new Note();
        note.setCustomerId(customerId);

        // Mock findByCustomerId method
        when(noteRepository.findByCustomerId(customerId)).thenReturn(Collections.singletonList(note));

        // Test if service returns note list
        assertThat(noteService.getNotesByCustomerId(customerId), containsInAnyOrder(note));
    }

    @Test
    public void addNoteSavesNoteWithCorrectData() {
        UUID customerId = UUID.fromString("957c0997-5431-423d-9394-b0ae8ffb941c");
        String content = "Some content";

        noteService.addNote(customerId, content);

        // Capture save() method call argument and test if it is correct
        ArgumentCaptor<Note> argumentCaptor = ArgumentCaptor.forClass(Note.class);
        verify(noteRepository).save(argumentCaptor.capture());

        Note note = argumentCaptor.getValue();

        assertThat(note.getCustomerId(), is(customerId));
        assertThat(note.getContent(), is(content));
    }

    @Test
    public void updateNoteSavesNoteWithNewContent() {
        UUID id = UUID.fromString("957c0997-5431-423d-9394-b0ae8ffb941c");
        String newContent = "New content";

        Note originalNote = new Note();
        originalNote.setId(id);

        // Mock findById method
        when(noteRepository.findById(any(UUID.class))).thenReturn(Optional.of(originalNote));

        // Call update method
        noteService.updateNote(id, newContent);

        // Capture call to save() and check values
        ArgumentCaptor<Note> argumentCaptor = ArgumentCaptor.forClass(Note.class);
        verify(noteRepository).save(argumentCaptor.capture());

        Note savedNote = argumentCaptor.getValue();

        assertThat(savedNote.getId(), is(id));
        assertThat(savedNote.getContent(), is(newContent));
    }

    @Test
    public void updateNoteDoesNotCallSaveIfNoteNotFound() {
        UUID id = UUID.fromString("957c0997-5431-423d-9394-b0ae8ffb941c");

        // Mock note not found
        when(noteRepository.findById(any(UUID.class))).thenReturn(Optional.empty());

        // Call update method
        noteService.updateNote(id, "New content");

        // Verify that save was never called
        verify(noteRepository, never()).save(any());
    }
}
