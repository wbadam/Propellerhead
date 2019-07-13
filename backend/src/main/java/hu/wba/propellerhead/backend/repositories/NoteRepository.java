package hu.wba.propellerhead.backend.repositories;

import hu.wba.propellerhead.backend.models.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface NoteRepository extends JpaRepository<Note, UUID> {

    List<Note> findByCustomerId(UUID customerId);
}
