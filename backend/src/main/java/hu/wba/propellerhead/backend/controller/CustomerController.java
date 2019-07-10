package hu.wba.propellerhead.backend.controller;

import hu.wba.propellerhead.backend.models.Customer;
import hu.wba.propellerhead.backend.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @RequestMapping("/customers")
    public List<Customer> getCustomers() {
        return customerService.listCustomers();
    }
}
