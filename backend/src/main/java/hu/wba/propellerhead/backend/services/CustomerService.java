package hu.wba.propellerhead.backend.services;

import hu.wba.propellerhead.backend.models.Customer;
import hu.wba.propellerhead.backend.models.CustomerStatus;
import hu.wba.propellerhead.backend.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CustomerService {

    // ExampleMatcher is immutable, hence reusable by threads
    private static final ExampleMatcher STRING_MATCHER_CONTAINING_IGNORE_CASE = ExampleMatcher
            .matchingAll()
            .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING)
            .withIgnoreCase();

    private final CustomerRepository repository;

    @Autowired
    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    public List<Customer> listCustomers(Sort sort) {
        return repository.findAll(sort);
    }

    public List<Customer> listCustomersFilteredByName(String name, Sort sort) {
        Customer probe = new Customer();
        probe.setName(name);

        Example<Customer> example = Example.of(probe, STRING_MATCHER_CONTAINING_IGNORE_CASE);

        return repository.findAll(example, sort);
    }

    public Optional<Customer> getCustomer(UUID id) {
        return repository.findById(id);
    }

    public Optional<Customer> updateCustomerStatus(UUID id, CustomerStatus status) {
        return repository.findById(id).map(customer -> {
            customer.setStatus(status);
            return customer;
        }).map(repository::save);
    }
}
