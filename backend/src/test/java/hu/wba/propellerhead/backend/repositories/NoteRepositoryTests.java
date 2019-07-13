package hu.wba.propellerhead.backend.repositories;

import hu.wba.propellerhead.backend.models.Note;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.UUID;

@RunWith(SpringRunner.class)
@DataJpaTest
public class NoteRepositoryTests {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    NoteRepository noteRepository;

    @Test
    public void findByCustomerIdReturnsCorrectNumberOfCustomers() {
        UUID customerId = UUID.fromString("2ea90c9b-778d-423b-945c-7e90a269b95c");
        UUID otherCustomerId = UUID.fromString("2b667fba-8f79-4de6-83b2-8c112ea2d07b");

        final int noteCount = 5;
        final int otherNoteCount = 2;

        for (int i = 0; i < noteCount; i++) {
            Note note = new Note();
            note.setCustomerId(customerId);
            note.setContent(String.format("Some note %d", i));
            entityManager.persist(note);
        }

        for (int i = 0; i < otherNoteCount; i++) {
            Note note = new Note();
            note.setCustomerId(otherCustomerId);
            note.setContent(String.format("Some other note %d", i));
            entityManager.persist(note);
        }

        entityManager.flush();

        List<Note> notes = noteRepository.findByCustomerId(customerId);

        Assert.assertEquals(noteCount, notes.size());
    }
}
