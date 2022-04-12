package com.atlantbh.auctionapp.controller;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    @Order(1)
    public void userRegistrationEmailNotValid() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"test.com\", \"firstName\": \"John\", \"lastName\": \"Doe\", \"password\": \"test1234\"}")
        ).andExpect(status().is4xxClientError());
    }

    @Test
    @Order(2)
    public void userRegistrationFirstNameEmpty() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"test@gmail.com\", \"firstName\": \"\", \"lastName\": \"Doe\", \"password\": \"test1234\"}")
        ).andExpect(status().is4xxClientError());
    }

    @Test
    @Order(3)
    public void userRegistrationLastNameEmpty() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"test@gmail.com\", \"firstName\": \"Test\", \"lastName\": \"\", \"password\": \"test1234\"}")
        ).andExpect(status().is4xxClientError());
    }

    @Test
    @Order(4)
    public void userRegistrationEmpty() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"\", \"firstName\": \"\", \"lastName\": \"\", \"password\": \"\"}")
        ).andExpect(status().is4xxClientError());
    }

    @Test
    @Order(5)
    public void userRegistrationOk() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"testtest@gmail.com\", \"firstName\": \"Test\", \"lastName\": \"Test\", \"password\": \"test\"}")
        ).andExpect(status().isOk());
    }

    @Test
    @Order(6)
    public void userRegistrationEmailAlreadyExists() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"test@gmail.com\", \"firstName\": \"Test\", \"lastName\": \"Test\", \"password\": \"test\"}")
        ).andExpect(status().is4xxClientError());
    }

    @Test
    @Order(7)
    public void userLoginEmailNotValid() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"test.com\", \"password\": \"test1234\"}")
        ).andExpect(status().is4xxClientError());
    }

    @Test
    @Order(8)
    public void userLoginNoExistingUser() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"test123456789@gmail.com\", \"password\": \"test\"}")
        ).andExpect(status().is4xxClientError());
    }

    @Test
    @Order(8)
    public void userLoginSuccess() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"testtest@gmail.com\", \"password\": \"test\"}")
        ).andExpect(status().isOk());
    }

    @Test
    @Order(9)
    public void userLoginPasswordIncorrect() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\": \"testtest@gmail.com\", \"password\": \"testttt\"}")
        ).andExpect(status().is4xxClientError());
    }
}
