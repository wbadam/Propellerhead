package hu.wba.propellerhead.backend.controller;

import hu.wba.propellerhead.backend.models.Customer;
import hu.wba.propellerhead.backend.services.CustomerService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public List<Customer> getCustomers(@RequestParam("name") String name) {
        List<Customer> customers;

        if (StringUtils.isNotEmpty(name)) {
            customers = customerService.listCustomersFilteredByName(name);
        } else {
            customers = customerService.listCustomers();
        }

        return customers;
    }

    @RequestMapping("/customers/{id}")
    public Customer getCustomer(@PathVariable String id) {
        return customerService.getCustomer(id).orElse(null);
    }
}
