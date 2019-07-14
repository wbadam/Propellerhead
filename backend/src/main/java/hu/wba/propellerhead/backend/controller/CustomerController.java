package hu.wba.propellerhead.backend.controller;

import hu.wba.propellerhead.backend.models.Customer;
import hu.wba.propellerhead.backend.models.dto.CustomerStatusUpdateRequest;
import hu.wba.propellerhead.backend.services.CustomerService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin("http://localhost:3000")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/customers")
    public List<Customer> getCustomers(@RequestParam(value = "name", required = false) String name, Sort sort) {
        List<Customer> customers;

        if (StringUtils.isNotEmpty(name)) {
            customers = customerService.listCustomersFilteredByName(name, sort);
        } else {
            customers = customerService.listCustomers(sort);
        }

        return customers;
    }

    @GetMapping("/customers/{id}")
    public ResponseEntity<Customer> getCustomer(@PathVariable UUID id) {
        return ResponseEntity.of(customerService.getCustomer(id));
    }

    @PatchMapping("/customers/{id}")
    public ResponseEntity<Customer> updateStatus(@PathVariable UUID id, @RequestBody CustomerStatusUpdateRequest statusUpdate) {
        return ResponseEntity.of(customerService.updateCustomerStatus(id, statusUpdate.getStatus()));
    }
}
