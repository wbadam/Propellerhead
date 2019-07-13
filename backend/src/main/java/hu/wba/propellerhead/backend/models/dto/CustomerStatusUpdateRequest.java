package hu.wba.propellerhead.backend.models.dto;

import hu.wba.propellerhead.backend.models.CustomerStatus;

public class CustomerStatusUpdateRequest {

    private CustomerStatus status;

    public CustomerStatus getStatus() {
        return status;
    }

    public void setStatus(CustomerStatus status) {
        this.status = status;
    }
}
