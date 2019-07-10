package hu.wba.propellerhead.backend.services;

import hu.wba.propellerhead.backend.models.Customer;
import hu.wba.propellerhead.backend.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository repository;

    @Autowired
    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    public List<Customer> listCustomers() {
        return repository.findAll();
    }
}
