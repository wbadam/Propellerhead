package hu.wba.propellerhead.backend.repositories;

import hu.wba.propellerhead.backend.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CustomerRepository extends JpaRepository<Customer, UUID> {
}
