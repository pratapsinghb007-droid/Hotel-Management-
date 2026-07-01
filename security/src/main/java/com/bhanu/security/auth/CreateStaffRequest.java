package com.bhanu.security.auth;

import com.bhanu.security.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateStaffRequest {

    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Role role;
}
